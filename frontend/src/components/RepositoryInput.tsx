import { FolderGit2 } from "lucide-react";

interface RepositoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RepositoryInput({
  value,
  onChange,
}: RepositoryInputProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        GitHub Repository URL
      </label>

      <div className="flex items-center rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 focus-within:border-blue-500">
        <FolderGit2
          size={20}
          className="mr-3 text-gray-400"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://github.com/owner/repository"
          className="
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
          "
        />
      </div>
    </div>
  );
}