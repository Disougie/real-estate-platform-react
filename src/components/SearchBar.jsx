import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 border border-gray-400 rounded bg-white px-4 py-2 w-full max-w-md">
      <Search className="text-gray-500" size={20} />
      <span className="text-gray-600 font-medium">بحث</span>
      <input
        type="text"
        className="flex-1 outline-none text-right bg-transparent"
        placeholder=""
      />
    </div>
  )
}
