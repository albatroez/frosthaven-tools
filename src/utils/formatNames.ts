export function capitalizeFirstWord(className: string) {
    return className
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
