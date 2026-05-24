import { useEffect, useMemo, useState } from 'react'
import { apis } from '../../api'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'

const TABS = [
  { key: 'users', label: 'المستخدمين' },
  { key: 'lawyers', label: 'المحامين' },
  { key: 'admins', label: 'المدراء' },
  { key: 'properties', label: 'العقارات' },
  { key: 'blogs', label: 'المدونة' },
]

const PAGE_SIZE = 10

function StatusBadge({ status }) {
  const map = {
    نشط: 'bg-emerald-100 text-emerald-700',
    موثق: 'bg-emerald-100 text-emerald-700',
    منشور: 'bg-emerald-100 text-emerald-700',
    معلق: 'bg-amber-100 text-amber-700',
    مراجعة: 'bg-amber-100 text-amber-700',
    'قيد المراجعة': 'bg-amber-100 text-amber-700',
    مسودة: 'bg-gray-100 text-gray-700',
    AVAILABLE: 'bg-emerald-100 text-emerald-700',
    PENDING_PROCESSING: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-emerald-100 text-emerald-700',
    BANNED: 'bg-red-100 text-red-700',
    محذوف: 'bg-red-100 text-red-700',
  }

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-bold ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
        active ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

function AddModal({ open, onClose, onAdd }) {
  const [mode, setMode] = useState('user') // user | lawyer | admin | blog
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    title: '',
    content: '',
  })

  if (!open) return null

  const reset = () =>
    setForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      title: '',
      content: '',
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(mode, form)
    reset()
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100"
              onClick={() => {
                reset()
                onClose()
              }}
            >
              إغلاق
            </button>
            <h3 className="text-xl font-extrabold text-primary">إضافة</h3>
          </div>

          <div className="p-5">
            <div className="mb-5 flex flex-wrap justify-end gap-2">
              <TabButton active={mode === 'user'} onClick={() => setMode('user')}>
                مستخدم
              </TabButton>
              <TabButton active={mode === 'lawyer'} onClick={() => setMode('lawyer')}>
                محامي
              </TabButton>
              <TabButton active={mode === 'admin'} onClick={() => setMode('admin')}>
                مدير
              </TabButton>
              <TabButton active={mode === 'blog'} onClick={() => setMode('blog')}>
                مدونة
              </TabButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(mode === 'user' || mode === 'lawyer' || mode === 'admin') && (
                <>
                  <Field label="الاسم">
                    <input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </Field>
                  <Field label="البريد الإلكتروني">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </Field>
                  <Field label="رقم الهاتف">
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
                      placeholder="09xxxxxxxx"
                    />
                  </Field>
                  <Field label="كلمة المرور">
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
                      placeholder="********"
                      required
                    />
                  </Field>
                </>
              )}

              {mode === 'blog' && (
                <>
                  <Field label="العنوان">
                    <input
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </Field>
                  <Field label="المحتوى">
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white p-4 text-right outline-none focus:ring-2 focus:ring-accent"
                      rows={5}
                      required
                    />
                  </Field>
                </>
              )}

              <div className="flex justify-start gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-8 py-3 font-bold text-white transition hover:bg-primary/90"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset()
                    onClose()
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 hover:bg-gray-100"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex items-center gap-3" dir='rtl'>
      <label className="min-w-[130px] text-right font-bold text-gray-800">
        {label}:
      </label>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function getRowTitle(tabKey, row) {
  if (tabKey === 'properties') return row.title
  if (tabKey === 'blogs') return row.title
  return row.name
}

function getRowSub(tabKey, row) {
  if (tabKey === 'properties') return row.city
  if (tabKey === 'blogs') return row.writer || 'مقال'
  return row.email
}

export default function AdminDashboardHomePage() {
  const [activeTab, setActiveTab] = useState('users')
  const [query, setQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0 })

  const fetchTab = () => {
    setLoading(true)

    const hasQuery = Boolean(query.trim())
    const text = query.trim()

    const call =
      activeTab === 'users'
        ? hasQuery
          ? apis.admin.searchUser(text, page, PAGE_SIZE)
          : apis.admin.getUsers(page, PAGE_SIZE)
        : activeTab === 'lawyers'
          ? hasQuery
            ? apis.admin.searchLawyer(text, page, PAGE_SIZE)
            : apis.admin.getLawyers(page, PAGE_SIZE)
          : activeTab === 'admins'
            ? hasQuery
              ? apis.admin.searchAdmin(text, page, PAGE_SIZE)
              : apis.admin.getAdmins(page, PAGE_SIZE)
            : activeTab === 'properties'
              ? hasQuery
                ? apis.admin.searchProperty(text, page, PAGE_SIZE)
                : apis.admin.getProperties1(page, PAGE_SIZE)
              : hasQuery
                ? apis.admin.searchBlog(text, page, PAGE_SIZE)
                : apis.admin.getBlogs(page, PAGE_SIZE)

    call
      .then((res) => setPageData(res.data || { content: [], totalPages: 0, totalElements: 0 }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page])

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(0)
      fetchTab()
    }, 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeTab])

  const rows = useMemo(() => {
    const content = pageData.content || []

    if (activeTab === 'properties') {
      return content.map((p) => ({
        id: p.id,
        title: p.title || '—',
        city: `${p.city || ''}${p.area ? `, ${p.area}` : ''}`,
        status: p.status || '—',
      }))
    }

    if (activeTab === 'blogs') {
      return content.map((b) => ({
        id: b.id,
        title: b.title || '—',
        writer: b.writer || '',
        status: b.createdAt ? 'منشور' : '—',
      }))
    }

    return content.map((u) => ({
      id: u.id,
      name: u.name || '—',
      email: u.email || '—',
      status: u.deletedAt != null ? 'محذوف' : u.enabled === false ? 'معلق' : 'نشط',
    }))
  }, [activeTab, pageData])

  const handleDelete = (id) => {
    const doDelete =
      activeTab === 'properties'
        ? apis.admin.deleteProperty(String(id))
        : activeTab === 'blogs'
          ? apis.admin.deleteBlog(Number(id))
          : apis.admin._delete(Number(id))

    doDelete.then(() => fetchTab())
  }

  const handleAdd = async (mode, form) => {
    if (mode === 'blog') {
      return await apis.admin.addBlog({ title: form.title, content: form.content}).then(() => {
        toast.success('تمت إضافة المقال بنجاح')
        setActiveTab('blogs')
        setQuery('')
        setPage(0)
        fetchTab()
      })
    }

    const registrationRequest = {
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      password: form.password,
      confirm_password: form.password,
    }

    const call =
      mode === 'user'
        ? apis.admin.registerUser({ ...registrationRequest })
        : mode === 'lawyer'
          ? apis.admin.registerLawyer({ ...registrationRequest })
          : apis.admin.registerAdmin({ ...registrationRequest })

    return call.then(() => {
      const nextTab = mode === 'user' ? 'users' : mode === 'lawyer' ? 'lawyers' : 'admins'
      toast.success('تمت الإضافة بنجاح')
      setActiveTab(nextTab)
      setQuery('')
      setPage(0)
      fetchTab()
    })
  }

  return (
    <div className="space-y-5">
      <div className="border-r-4 border-primary bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <h1 className="text-right text-3xl font-bold text-primary">
            لوحة المدير
          </h1>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="rounded-lg bg-primary px-6 py-2 font-bold text-white transition hover:bg-primary/90"
          >
            إضافة
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-end gap-2">
        {TABS.map((t) => (
          <TabButton
            key={t.key}
            active={activeTab === t.key}
            onClick={() => {
              setActiveTab(t.key)
              setQuery('')
            }}
          >
            {t.label}
          </TabButton>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 w-[50%]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-right outline-none focus:ring-2 focus:ring-accent"
          />
          {/* <button className='bg-primary p-4' onClick={fetchTab}>
            <Search className="text-white" size={20} />
          </button> */}
          <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-bold text-gray-700">
            {pageData.totalElements || 0}
          </span>
        </div>
      </div>

      {/* Table/List */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-700 md:grid">
          <div className="col-span-3 text-right">الاسم / العنوان</div>
          <div className="col-span-5 text-right">تفاصيل</div>
          <div className="col-span-2 text-right">الحالة</div>
          <div className="col-span-2 text-left">إجراء</div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading && (
            <div className="p-10 text-center text-gray-600">جاري تحميل البيانات...</div>
          )}

          {!loading &&
            rows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-12 md:items-center">
              <div className="md:col-span-3">
                <div className="text-right font-extrabold text-primary">
                  {getRowTitle(activeTab, row)}
                </div>
                <div className="mt-1 text-right text-sm text-gray-500 md:hidden">
                  {getRowSub(activeTab, row)}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="text-right text-gray-700">{getRowSub(activeTab, row)}</div>
              </div>

              <div className="md:col-span-2 md:text-right">
                <StatusBadge status={row.status} />
              </div>

              <div className="md:col-span-2 md:text-left">
                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700 md:w-auto"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          {!loading && rows.length === 0 && (
            <div className="p-10 text-center text-gray-600">لا توجد بيانات</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
        <div className="text-sm text-gray-600">
          الصفحة: <span className="font-bold">{page + 1}</span>
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
            {page + 1} / {Math.max(1, pageData.totalPages || 1)}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((p) => {
                const last = Math.max(0, (pageData.totalPages || 1) - 1)
                return Math.min(last, p + 1)
              })
            }
            disabled={pageData.totalPages ? page >= pageData.totalPages - 1 : true}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-700 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>

      <AddModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
    </div>
  )
}

