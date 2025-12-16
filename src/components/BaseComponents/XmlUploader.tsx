import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/Shadcn/button';
import { Loader2, CloudUpload } from 'lucide-react';
import { toastNotification } from '@/lib/utils';

export default function XmlUploader({
  setData,
  title = 'Nhập file XML',
}: {
  title?: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setFileName(file.name);

    try {
      const xmlText = await file.text(); // Lấy nội dung XML nguyên bản
      setData(xmlText); // Lưu nguyên text XML
    } catch (err) {
      console.error(err);
      setError('Lỗi khi đọc file XML.');
      toastNotification('Tải dữ liệu lỗi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearData = () => {
    setData('');
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
            <Button variant="outline" size="sm" onClick={clearData}>
              Hủy
            </Button>
          </div>
        )}
      </div>

      <input
        type="file"
        accept=".xml"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
