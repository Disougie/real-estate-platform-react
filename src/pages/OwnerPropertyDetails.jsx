import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apis } from '../api';
import toast from 'react-hot-toast';
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { http } from '../api/http';

export default function OwnerPropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Property data state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Images state
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const res = await apis.properties.getProperty(id);
      const data = res.data;

      setTitle(data.title || '');
      setDescription(data.description || data.decription || '');
      setPrice(data.price || '');
      setExistingImages(data.imagesUrls || []);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('حدث خطأ أثناء تحميل تفاصيل العقار');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setNewImages((prev) => [...prev, ...filesArray]);
    }
    // Reset the input value so the same file can be selected again if needed
    e.target.value = null;
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveNewImage = (indexToRemove) => {
    setNewImages(newImages.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', Number(price));

      // Append existing image URLs so backend knows which ones to keep
      existingImages.forEach((url) => {
        formData.append('existingImagesUrls', url);
      });

      // Append new files
      newImages.forEach((file) => {
        formData.append('images', file);
      });

      const res = await http.patch(
        `/api/v1/properties/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      toast.success('تم حفظ التعديلات بنجاح');

      // Navigate back to MyProperties or Home
      navigate(-1);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('حدث خطأ أثناء حفظ التعديلات');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  // Combine both arrays for the main preview cover logic
  const allPreviewImages = [
    ...existingImages,
    ...newImages.map(f => URL.createObjectURL(f))
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 border-r-4 border-primary bg-white">
            <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
              تعديل تفاصيل العقار
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-4">المعاينة</h2>

              <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 aspect-video relative flex items-center justify-center">
                {allPreviewImages.length > 0 ? (
                  <img
                    src={allPreviewImages[0]}
                    alt="Property Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=No+Image' }}
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImageIcon size={48} className="mb-2" />
                    <span>لا توجد صور</span>
                  </div>
                )}
                {allPreviewImages.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                    +{allPreviewImages.length - 1} صور أخرى
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{title || 'عنوان العقار'}</h3>
                  <p className="text-primary font-bold text-xl mt-2">
                    {price ? `${price} ج.س` : 'السعر غير محدد'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <form onSubmit={handleSave} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان العقار</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="مثال: فيلا فاخرة للبيع في الرياض"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ر.س)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="مثال: 1500000"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="اكتب وصفاً مفصلاً للعقار..."
                    required
                  />
                </div>

                {/* Images Management */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>

                  {/* File Upload Input */}
                  <div className="mb-4">
                    <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-primary">
                        <Upload size={28} />
                        <span className="font-medium">اضغط هنا لرفع صور جديدة</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Render Existing Images */}
                    {existingImages.map((url, index) => (
                      <div key={`existing-${index}`} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                        <img
                          src={url}
                          alt={`Existing Property ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error' }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Render New Uploaded Images */}
                    {newImages.map((file, index) => {
                      const previewUrl = URL.createObjectURL(file);
                      return (
                        <div key={`new-${index}`} className="relative group rounded-xl overflow-hidden border border-blue-200 aspect-square">
                          <img
                            src={previewUrl}
                            alt={`New Property ${index + 1}`}
                            className="w-full h-full object-cover"
                            onLoad={() => URL.revokeObjectURL(previewUrl)}
                          />
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow">
                            جديد
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveNewImage(index)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      'حفظ التعديلات'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
