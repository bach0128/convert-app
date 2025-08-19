import type React from 'react';
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/Shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/Shadcn/card';
import { Alert, AlertDescription } from '@/components/Shadcn/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/table';
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react';
import { toastNotification } from '@/lib/utils';

interface ExcelData {
  [key: string]: string | number | boolean;
}

export default function ExcelUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<ExcelData[]>([]);
  // const [data, setData] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // read file and export to rows
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert to JSON with headers
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '', // Default value for empty cells
        }) as (string | number | boolean)[][];

        if (jsonData.length > 0) {
          // Extract headers from first row
          const headers = jsonData[0].map((header) => String(header));
          setHeaders(headers);

          // Convert remaining rows to objects
          const rows = jsonData.slice(1).map((row) => {
            const obj: ExcelData = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] ?? '';
            });
            return obj;
          });

          setData(rows);
        } else {
          setError('The Excel file appears to be empty.');
        }
      } catch {
        setError(
          "Error reading file. Please make sure it's a valid Excel file."
        );
        toastNotification('Tải dữ liệu lỗi', 'error');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // read file and export to json

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();

  //   // Đọc file dưới dạng ArrayBuffer (ổn định nhất)
  //   reader.onload = (event) => {
  //     const arrayBuffer = event.target?.result as ArrayBuffer;

  //     // Đọc workbook từ buffer
  //     const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  //     // Lấy sheet đầu tiên
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];

  //     // Chuyển sheet sang JSON
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //     setData(jsonData);
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearData = () => {
    setData([]);
    setHeaders([]);
    setFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Excel File Uploader
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleUploadClick}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {loading ? 'Processing...' : 'Upload Excel File'}
            </Button>

            {fileName && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Uploaded: {fileName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearData}
                  disabled={loading}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>

          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {data.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Data Preview ({data.length} rows)
                </h3>
              </div>

              <div className="border rounded-md max-h-96 overflow-auto">
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
                    {data.slice(0, 100).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                          <TableCell key={colIndex}>
                            {String(row[header] || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {data.length > 100 && (
                <p className="text-sm text-muted-foreground">
                  Showing first 100 rows of {data.length} total rows
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
