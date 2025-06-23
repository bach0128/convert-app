import { Upload, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shadcn/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Shadcn/card";
import * as XLSX from "xlsx";
import { Button } from "@/components/Shadcn/button";
import { Alert, AlertDescription } from "@/components/Shadcn/alert";

interface ExcelData {
  [key: string]: any;
}

function HomePage() {
  const [data, setData] = useState<ExcelData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[][];

        if (jsonData.length > 0) {
          const headers = jsonData[0] as string[];
          setHeaders(headers);

          const rows = jsonData.slice(1).map((row) => {
            const obj: ExcelData = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || "";
            });
            return obj;
          });

          setData(rows);
        }
      } catch (err) {
        setError(
          "Error reading file. Please make sure it's a valid Excel file."
        );
        console.error("Error reading file:", err);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Error reading file.");
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearData = () => {
    setData([]);
    setHeaders([]);
    setFileName("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="px-10 py-3 flex flex-1 flex-col">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        autem adipisci molestiae eaque ut fugiat ipsam itaque voluptatum,
        dolore, accusantium quod nesciunt tempora reprehenderit recusandae
        optio? Iure natus non molestias!
      </p>
      <div className="flex items-center gap-4 flex-col sm:flex-row">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer"
          title="Upload Excel File"
        >
          Upload an Excel file (.xlsx, .xls) to view its contents
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          onClick={handleButtonClick}
          variant="outline"
          className="flex items-center gap-2"
          disabled={loading}
        >
          <Upload className="h-4 w-4" />
          {loading ? "Processing..." : "Select File"}
        </Button>
        {fileName && (
          <span className="text-sm text-muted-foreground">
            Selected: {fileName}
          </span>
        )}
        {data.length > 0 && (
          <Button
            onClick={clearData}
            variant="outline"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            Clear
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 flex-1 flex flex-col min-h-0">
        {data.length > 0 && (
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader>
              <CardTitle>Excel Data</CardTitle>
              <CardDescription>
                Showing {data.length} rows from {fileName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <div className="rounded-md border flex-1 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableHead key={index} className="font-semibold">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                          <TableCell key={colIndex}>
                            {row[header]?.toString() || ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default HomePage;
