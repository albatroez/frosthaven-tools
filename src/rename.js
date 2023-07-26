import { readdir, stat, rename, open, writeFile } from "fs/promises";
import path from "path";
import { abilityCards } from "./data/ability-cards.js";

async function renameFiles(directoryPath, parentDirName) {
    const files = await readdir(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const fileStat = await stat(filePath);

        if (fileStat.isDirectory()) {
            await renameFiles(filePath, file);
        } else {
            if (file.includes("back.png")) {
                const newName = "fh-" + parentDirName.toLowerCase() + "-back.png";
                const newPath = path.join(directoryPath, newName);

                await rename(filePath, newPath);
                console.log(`${filePath} renamed to ${newPath}`);
            }
        }
    }
}

const rootDirectory = "/Users/jzielinski/IdeaProjects/personal/frosthaven-tools/public";
// await renameFiles(rootDirectory);

const dataPath = "/Users/jzielinski/IdeaProjects/personal/frosthaven-tools/src/data/classes";
async function createClassFiles(directoryPath, source) {
    const names = await readdir(source);

    for (const name of names) {
        await writeFile(path.join(dataPath, name + ".ts"), `export const ${name} = [\n]`);
    }
}

async function copyNonDuplicates() {
    const names = await readdir(rootDirectory);
    const files = await readdir(dataPath);

    for (const file of files) {
        const index = files.indexOf(file);
        const cards = abilityCards.filter(card => card.image.includes(names[index] + "/"));
        const uniqueCards = cards.reduce((acc, curr) => {
            if (acc.some(card => card.cardno === curr.cardno)) {
                return [...acc];
            }
            return [...acc, curr];
        }, []);
        await writeFile(
            path.join(dataPath, names[index] + ".ts"),
            `export const ${names[index]} = ${JSON.stringify(uniqueCards)} as const;`,
        );
    }
}

await copyNonDuplicates();

// await createClassFiles(dataPath, rootDirectory);
