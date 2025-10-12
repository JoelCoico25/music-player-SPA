// Process a FileList or array of Files coming from an <input type="file" webkitdirectory>
const processFiles = async (inputFiles) => {
    const filesArray = Array.from(inputFiles || []);
    const audioFiles = filesArray.filter((file) => file && (file.type?.startsWith("audio/") || /\.(mp3|wav|m4a|aac|ogg|flac|webm|opus)$/i.test(file.name)));
    const processed = audioFiles.map((file) => {
        const path = file.webkitRelativePath || file.name;
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        return {
            id: (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: nameWithoutExt,
            path,
            url: URL.createObjectURL(file),
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            file
        };
    });
    // Optional: keep directory order stable
    processed.sort((a, b) => a.path.localeCompare(b.path));
    return processed;
};

// Backwards compatibility for previous misspelling
export const proccessFiles = processFiles;
export default processFiles;