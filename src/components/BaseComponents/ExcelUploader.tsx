import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/Shadcn/button';
import { Loader2, CloudUpload } from 'lucide-react';
import { toastNotification } from '@/lib/utils';
import type { ExcelData } from '@/types/excelFile';

export default function ExcelUploader({
  setData,
  title = 'Nhập file',
}: {
  title?: string;
  data: ExcelData[];
  setData: React.Dispatch<React.SetStateAction<ExcelData[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  // const [headers, setHeaders] = useState<string[]>([]);

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
          // setHeaders(headers);

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
          setError('File không có dữ liệu.');
        }
      } catch {
        setError('Có lỗi khi tải dữ liệu lên. Vui lòng kiểm tra lại file.');
        toastNotification('Tải dữ liệu lỗi', 'error');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Lỗi đọc file');
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
    // setHeaders([]);
    setFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (error) toastNotification(error, 'error');
  }, [error]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleUploadClick}
          disabled={loading}
          className="flex items-center gap-2"
          variant={'outline'}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CloudUpload className="h-4 w-4" />
          )}
          {loading ? 'Loading...' : title}
        </Button>

        {fileName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              File đã chọn: {fileName}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearData}
              disabled={loading}
            >
              Hủy
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
    </div>
  );
}
