import { useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import PropertyGrid from '../components/PropertyGrid'

function HomePage() {
  const [filters, setFilters] = useState({
    region: '',
    city: '',
    roomsMin: 4,
    roomsMax: 6,
    bathroomsMin: 1,
    bathroomsMax: 2,
    priceMin: 2000000,
    priceMax: 3000000,
  })

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({
      region: '',
      city: '',
      roomsMin: 4,
      roomsMax: 6,
      bathroomsMin: 1,
      bathroomsMax: 2,
      priceMin: 2000000,
      priceMax: 3000000,
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
              <SearchBar />
            </div>
          </div>

          {/* Property Grid */}
          <PropertyGrid />
        </main>

        {/* Sidebar */}
        <Sidebar 
          filters={filters} 
          setFilters={setFilters} 
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>
    </div>
  )
}

export default HomePage
