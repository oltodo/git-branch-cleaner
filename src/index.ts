import { prompt } from 'inquirer';
import simpleGit from 'simple-git';
import chalk from 'chalk';

(async function main() {
  const git = simpleGit();
  const { all: branches } = await git.branchLocal();

  if (branches.length === 1) {
    throw new Error('You only have one branch');
  }
  if (branches.length === 0) {
    throw new Error('No branch found');
  }

  const mainBranch = branches.includes('main') ? 'main' : 'master';

  const { all: mergedBranches } = await git.branch(['--merged', mainBranch]);

  const { selectedBranches } = await prompt({
    name: 'selectedBranches',
    type: 'checkbox',
    message: 'Select the branches to delete',
    choices: branches
      .filter((branch) => branch !== mainBranch)
      .map((branch) => ({
        name: mergedBranches.includes(branch)
          ? `${branch} ${chalk.gray.italic('merged')}`
          : branch,
        value: branch,
        toto: 'tutu',
      })),
  });

  await git.deleteLocalBranches(selectedBranches, true);
})();
