import { readdir, rename, stat, writeFile } from "fs/promises";
import path from "path";
import { allClasses } from "./data/classes.js";
// import { abilityCards } from "./data/ability-cards.js";

async function renameFiles(directoryPath, parentDirName) {
    const files = await readdir(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const fileStat = await stat(filePath);

        if (fileStat.isDirectory()) {
            await renameFiles(filePath, file);
        } else {
            if (file.includes("icon.png")) {
                const code = Object.entries(allClasses).reduce((acc, [key, curr]) => {
                    if (!acc) {
                        const s = curr.name.toLowerCase().split(' ').join('-');
                        if (file.includes(s)) {
                            return key;
                        }
                    }
                    return acc;
                }, '')
                const newName = "fh-" + code + "-icon.png";
                const newPath = path.join(directoryPath, newName);

                await rename(filePath, newPath);
                console.log(`${filePath} renamed to ${newPath}`);
            }
        }
    }
}

const rootDirectory = "/Users/jzielinski/IdeaProjects/personal/frosthaven-tools/public/icons";
await renameFiles(rootDirectory);

const dataPath = "/Users/jzielinski/IdeaProjects/personal/frosthaven-tools/src/data/abilityCards";

async function createClassFiles(directoryPath, source) {
    const names = await readdir(source);

    for (const name of names) {
        await writeFile(path.join(dataPath, name + ".ts"), `export const ${name} = [\n]`);
    }
}

async function copyNonDuplicates() {
    const names = await readdir(rootDirectory);
    const files = await readdir(dataPath);

    for (const name of names) {
        const index = names.indexOf(name);
        const cards = abilityCards.filter(card => card.image.includes(names[index] + "/") && card.cardno !== "-");
        const uniqueCards = cards.reduce((acc, curr) => {
            if (acc.some(card => card.cardno === curr.cardno)) {
                return [...acc];
            }
            return [...acc, curr];
        }, []);
        const enrichedCards = uniqueCards.map(card => ({
            ...card,
            levelNo: card.level === "X" ? 1 : Number(card.level),
        }));
        await writeFile(
            path.join(dataPath, names[index] + ".ts"),
            `export const ${names[index]} = ${JSON.stringify(enrichedCards)} as const;`,
        );
    }
}

// await copyNonDuplicates();

// await createClassFiles(dataPath, rootDirectory);
