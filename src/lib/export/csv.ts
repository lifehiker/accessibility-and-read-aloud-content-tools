export interface AltTextRow {
  fileName: string;
  concise: string;
  descriptive: string;
  ecommerce: string;
}

export function generateAltTextCsv(rows: AltTextRow[]): string {
  const headers = ["File Name", "Concise Alt Text", "Descriptive Alt Text", "Ecommerce Alt Text"];

  const escapeCsv = (value: string): string => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const lines = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) =>
      [row.fileName, row.concise, row.descriptive, row.ecommerce]
        .map(escapeCsv)
        .join(",")
    ),
  ];

  return lines.join("\n");
}
