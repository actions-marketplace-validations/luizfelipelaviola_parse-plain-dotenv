import { writeFileSync } from 'fs';
import { exportVariable, getInput, setFailed } from '@actions/core';
import { parse } from 'dotenv';

function main() {
  try {
    const dataInput = getInput('data', { required: true });
    const parseEnvInput = getInput('parse-env', { required: false }) === 'true';
    const writeEnvInput = getInput('write-env-file', { required: false }) === 'true';
    const envFilePath = getInput('env-file-path', { required: false });

    const parsed = parse(dataInput);

    if (parseEnvInput)
      Object.entries(parsed).forEach(([key, value]) => {
        exportVariable(key, value);
      });

    if (writeEnvInput) writeFileSync(envFilePath || '.env', dataInput);
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
    else setFailed('Unknown error');
  }
}

main();
