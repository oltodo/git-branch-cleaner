import { prompt } from 'inquirer';
import simpleGit from 'simple-git';

(async function main() {
  const git = simpleGit();
  const { all: branches } = await git.branchLocal();

  const { selectedBranches } = await prompt({
    name: 'selectedBranches',
    type: 'checkbox',
    message: 'Select the branches to delete',
    choices: branches,
  });

  await Promise.all(
    selectedBranches.map((branch: string) => {
      return git.deleteLocalBranch(branch, true);
    }),
  );
})();
