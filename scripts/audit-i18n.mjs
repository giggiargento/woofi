#!/usr/bin/env node
/**
 * Scans TSX files for likely hardcoded UI strings (heuristic audit).
 * See docs/DEVELOPMENT-RULES.md
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const scanRoots = [
  join(process.cwd(), 'app'),
  join(process.cwd(), 'src', 'components'),
  join(process.cwd(), 'src', 'hooks'),
];
const findings = [];

const patterns = [
  { name: 'Text literal', regex: /<Text[^>]*>\s*[A-Za-zÁ-ú][^<{]{2,}\s*<\/Text>/g },
  { name: 'title prop literal', regex: /title=["'][A-Za-z][^"']{2,}["']/g },
  { name: 'label prop literal', regex: /label=["'][A-Za-z][^"']{2,}["']/g },
  { name: 'subtitle prop literal', regex: /subtitle=["'][A-Za-z][^"']{2,}["']/g },
  { name: 'placeholder literal', regex: /placeholder=["'][A-Za-z][^"']{2,}["']/g },
  { name: 'Alert literal', regex: /Alert\.alert\(\s*["'][A-Za-z][^"']+["']/g },
];

const englishUiWords =
  /\b(Loading|Error|Save|Cancel|Delete|Edit|Search|Home|Profile|Settings|Welcome|Sign in|Sign out|Create account|Forgot password|No results|Something went wrong|Retry|Continue|Back|Next|Done|Required|Unknown|User)\b/;

function walk(dir, files = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (full.endsWith('.tsx')) files.push(full);
  }
  return files;
}

const files = scanRoots.flatMap((root) => walk(root));

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const rel = relative(process.cwd(), file);

  for (const { name, regex } of patterns) {
    const matches = content.match(regex);
    if (matches) {
      for (const match of matches) {
        if (match.includes('className') || match.includes('http')) continue;
        findings.push({ file: rel, type: name, match: match.slice(0, 100) });
      }
    }
  }

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('//') || line.includes('t(') || line.includes('useTranslation')) {
      continue;
    }
    if (
      (line.includes('<Text') || line.includes('title=') || line.includes('label=')) &&
      englishUiWords.test(line) &&
      !line.includes('throw new Error')
    ) {
      findings.push({
        file: rel,
        type: 'English UI word',
        match: line.trim().slice(0, 100),
      });
    }
  }
}

if (findings.length === 0) {
  console.log('✅ No obvious hardcoded UI strings found in app/, src/components/, src/hooks/');
} else {
  console.log(`⚠️  ${findings.length} potential hardcoded UI string(s):`);
  for (const f of findings) {
    console.log(`  [${f.type}] ${f.file}: ${f.match}`);
  }
  process.exit(1);
}
