import { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import PropertyGrid from '../components/PropertyGrid'
import { Search } from 'lucide-react'
import { apis } from '../api'

function HomePage() {
  const [page, setPage] = useState(0)
  const [size] = useState(12)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 })
  const [mode, setMode] = useState('DEFAULT')
  const [searchText, setSearchText] = useState('');



  const [filters, setFilters] = useState({
    type: null,
    city: null,
    area: null,
    minRooms: 1,
    maxRooms: 4,
    minBaths: 1,
    maxBaths: 2,
    minPrice: 100000,
    maxPrice: 3000000,
    minSize: 80,
    maxSize: 300,
  })

  const searchTextChangeHandler = (text) => {
    setSearchText(text);
  }

  const fetchData = async () => {

    setLoading(true);
    try {
      let res;
      if (mode === 'DEFAULT') {
        res = await apis.properties.getProperties(page, size);
        setData(res.data || { content: [], totalPages: 0, totalElements: 0 })
      } else if (mode == 'TEXT_SEARCH') {
        let text = String(searchText).trim();
        res = await apis.properties.searchByText(text, page, size)
        setData(res.data || { content: [], totalPages: 0, totalElements: 0 })
      } else if (mode == 'FILTER_SEARCH') {
        res = await apis.properties.searchByFilters(
          filters.type,
          filters.city, filters.area,
          filters.minRooms, filters.maxRooms,
          filters.minBaths, filters.maxBaths,
          filters.minPrice, filters.maxPrice,
          filters.minSize, filters.maxSize,
          page, size
        );
        setData(res.data || { content: [], totalPages: 0, totalElements: 0 })
      } else if (mode == 'RECOMMENDATION') {
        res = await apis.recommendations.getRecommendations();
        setData({ content: res.data || [], totalPages: 1, totalElements: res.data.length });
      }

    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchData();
  }, [page, size, mode])

  const handleTextSearch = () => {
    if(searchText.trim() === '') {
      setMode('DEFAULT');
      setPage(0);
      return;
    }
    if(mode === 'TEXT_SEARCH') {
      fetchData();
      return;
    }
    setPage(0);
    setMode('TEXT_SEARCH')
  }

  const handleFilterSearch = () => {
    if(mode === 'FILTER_SEARCH') {
      fetchData();
      return;
    }
    setPage(0);
    setMode('FILTER_SEARCH')
  }

  const handleRecommendation = () => {
    setPage(0);
    setMode('RECOMMENDATION')
  }

  const handleReset = () => {
    setFilters({
      type: null,
      city: null,
      area: null,
      minRooms: 1,
      maxRooms: 4,
      minBaths: 1,
      maxBaths: 2,
      minPrice: 100000,
      maxPrice: 3000000,
      minSize: 80,
      maxSize: 300,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row-reverse">
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Top Section with Tabs and Search */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex justify-center w-full lg:w-auto">
              {/* <SearchBar /> */}
              <div className="flex items-center gap-2 border border-gray-400 rounded bg-white px-4 py-2 w-full max-w-md">
                <Search className="text-gray-500" size={20} />
                <span className="text-gray-600 font-medium">بحث</span>
                <input
                  value={searchText}
                  type="text"
                  className="flex-1 outline-none text-right bg-transparent"
                  placeholder=""
                  onChange={(e) => searchTextChangeHandler(e.target.value)}
                />
              </div>
              {/* Search Button */}
              <button className='bg-primary p-4' onClick={handleTextSearch}>
                <Search className="text-white" size={20} />
              </button>
            </div>
            <button className='bg-primary text-white p-4' onClick={handleRecommendation}>
              الافتراحات
            </button>
          </div>

          {/* Property Grid */}
          <PropertyGrid loading={loading} data={data} />

          {/* Pagenation */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
            <div className="text-sm text-gray-600">
              إجمالي النتائج: <span className="font-bold">{data.totalElements || 0}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page <= 0}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-700 disabled:opacity-50"
              >
                السابق
              </button>
              <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
                {page + 1} / {Math.max(1, data.totalPages || 1)}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((p) => {
                    const last = Math.max(0, (data.totalPages || 1) - 1)
                    return Math.min(last, p + 1)
                  })
                }
                disabled={data.totalPages ? page >= data.totalPages - 1 : true}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-700 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          onSearch={handleFilterSearch}
          onReset={handleReset}
        />
      </div>
    </div>
  )
}

export default HomePage
