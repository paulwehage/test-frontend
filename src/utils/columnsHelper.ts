export type Column = {
    field: string;
    headerName: string;
    width?: number;
    editable: boolean;
    flex?: number;
};

const COLUMN_DEFAULT: Column[] = [
    { editable: false, headerName: "Product", width: 200, field: "product" }
];

const COLUMNS_CONFIG = {
    getWidth: (field: string) => {
        if (field === "latestReleaseDate" || field === "lts" || field === "support" || field === "eol" || field === "latest") return { width: 150 }
        return { flex: 1 }
    },
    mapper: (headerName: string) => {
        if (headerName === "Eol") return "Security Support"
        if (headerName === "Support") return "Active Support"
        if (headerName === "Lts") return "LTS"
        return headerName;
    }
}

export const columnsBuilder = (keys: string[]) => COLUMN_DEFAULT.concat(keys.map(key => {
    const capitalizedString = key.charAt(0).toUpperCase() + key.slice(1);
    const description = capitalizedString.match(/[A-Z][a-z]+/g)?.join(" ") as string;
    return {
      editable: false,
      headerName: COLUMNS_CONFIG.mapper(description),
      field: key,
      ...COLUMNS_CONFIG.getWidth(key),      
    };
}))