import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';

const optionStatus = [
  {
    value: '3',
    label: 'Tạo mới',
  },
  {
    value: '2',
    label: 'Ngưng hoạt động',
  },
  {
    value: '1',
    label: 'Đang hoạt động',
  },
];

function SelectStatus({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue: string | undefined;
}) {
  return (
    <Select
      onValueChange={(value) => onChange(value)}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px] overflow-y-auto">
        <SelectGroup>
          {optionStatus.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectStatus;
