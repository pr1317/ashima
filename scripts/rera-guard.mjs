/* ============================================================================
   WBRERA launch guard.

   Enforcement is currently OFF. The switch lives in src/data/rera-policy.json.
   While enforce is false, a live project with a missing or unverified
   registration number is reported here and the build carries on. Set enforce
   to true once the real numbers are in the project files and this turns back
   into a hard failure.

   Why the machinery exists at all. Section 11(2) of the Real Estate
   (Regulation and Development) Act 2016, read with WBRERA Order No.
   492-RERA/L-01/2023 dated 07.03.2024, requires the registration number on
   every advertisement for a registered project, and the order covers
   websites. Penalties run to 5% of the estimated project cost and the West
   Bengal Housing department does check. Publishing a made-up number is worse
   than publishing none, so this guard is what stops a sample number reaching
   the live site once it is switched on.

   It reads the generated data module rather than the markdown, so it checks
   exactly what the site would ship.
   ========================================================================= */
import fs from 'node:fs';

const POLICY = JSON.parse(fs.readFileSync('src/data/rera-policy.json', 'utf8'));
const LIVE = ['available', 'under-construction'];

const source = fs.readFileSync('src/data/projects.ts', 'utf8');
const match = source.match(/export const projects: Project\[\] = (\[[\s\S]*\]);\s*$/);
if (!match) {
  console.error('RERA guard: could not read src/data/projects.ts. Run scripts/gen-content.mjs.');
  process.exit(1);
}
const projects = JSON.parse(match[1]);

const problems = [];
for (const p of projects) {
  if (!LIVE.includes(p.status)) continue;
  if (!p.reraNumber) {
    problems.push(`"${p.name}" is ${p.status} and has no reraNumber.`);
  } else if (!p.reraVerified) {
    problems.push(`"${p.name}" is ${p.status} with reraNumber ${p.reraNumber}, still unverified.`);
  } else if (/X{4,}/.test(p.reraNumber)) {
    problems.push(`"${p.name}" is marked verified but the number still contains XXXX.`);
  }
}

if (!problems.length) {
  console.log('RERA guard: every live project carries a verified registration number.');
  process.exit(0);
}

if (!POLICY.enforce) {
  console.warn('');
  console.warn('  WBRERA numbers still to sort out. Not blocking the build.');
  console.warn('');
  problems.forEach((p) => console.warn('   - ' + p));
  console.warn('');
  console.warn('  Set enforce to true in src/data/rera-policy.json once the real numbers');
  console.warn('  are in the project files, and these go back to stopping the build.');
  console.warn('');
  process.exit(0);
}

console.error('');
console.error('  LAUNCH BLOCKED, unverified WBRERA registration numbers');
console.error('');
problems.forEach((p) => console.error('   * ' + p));
console.error('');
console.error('  Section 11(2) of the Real Estate (Regulation and Development) Act 2016');
console.error('  and WBRERA Order No. 492-RERA/L-01/2023 require the real registration');
console.error('  number on every advertisement. Penalties reach 5% of project cost.');
console.error('');
console.error('  Put the real number in the markdown file, re-run scripts/gen-content.mjs,');
console.error('  and set reraVerified to true once your RERA consultant has confirmed the');
console.error('  number and the display.');
console.error('');
process.exit(1);
