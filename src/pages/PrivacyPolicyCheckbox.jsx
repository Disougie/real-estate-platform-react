import React, { useState, useRef, useEffect } from 'react';

const PrivacyPolicyCheckbox = ({ isChecked, setIsChecked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef();

    // إغلاق الـ Pop-up عند الضغط خارجه
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="w-full my-4 text-right" dir="rtl">
            {/* Checkbox Box */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-white">
                    أوافق على 
                    <button 
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="text-blue-600 font-semibold hover:underline mx-1 focus:outline-none"
                    >
                        سياسة الخصوصية وشروط الاستخدام
                    </button>
                    الخاصة بالمنصة.
                </span>
            </label>

            {/* الـ Pop-up (Modal) */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div 
                        ref={modalRef}
                        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
                    >
                        {/* رأس الـ Pop-up */}
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">سياسة الخصوصية</h3>
                            <button 
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                            >
                                &times;
                            </button>
                        </div>

                        {/* محتوى السياسات (قابل للتمرير لو النص طويل) */}
                        <div className="p-6 overflow-y-auto text-gray-600 text-sm leading-relaxed space-y-4">
                            <p className="font-semibold text-gray-700">مرحباً بك في منصتنا العقارية. حمايتك وحماية بياناتك هي أولويتنا القصوى.</p>
                            
                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">1. جمع المعلومات:</h4>
                                <p>نقوم بجمع البيانات اللازمة لتقديم خدماتنا العقارية بكفاءة، وتشمل: معلومات الحساب (الاسم، البريد الإلكتروني، ورقم الهاتف)، وبيانات الإعلانات (تفاصيل العقار، الصور، والموقع الجغرافي).</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">2. استخدام البيانات:</h4>
                                <p>تُستخدم بياناتكم لتمكين التواصل بين البائعين والمشترين، ولتسهيل الإجراءات القانونية ومراجعة العقود عبر المحامين المعتمدين في المنصة، بالإضافة إلى تقديم توصيات عقارية مخصصة واقتراحات تتناسب مع اهتماماتكم.</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">3. حماية البيانات ومشاركتها:</h4>
                                <p>نحن نلتزم بأعلى معايير الأمان لحماية بياناتكم من الوصول غير المصرح به. لن يتم بيع بياناتكم الشخصية أو مشاركتها مع أطراف ثالثة لأغراض تسويقية، ويقتصر مشاركتها فقط مع الأطراف المعنية مباشرة بالعملية العقارية (مثل المحامين).</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">4. ملفات تعريف الارتباط (Cookies):</h4>
                                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم، وحفظ خيارات البحث، وتسهيل عمليات تسجيل الدخول القادمة.</p>
                            </div>
                        </div>

                        {/* أسفل الـ Pop-up (أزرار التحكم) */}
                        <div className="p-4 border-t bg-gray-50 flex justify-end">
                            <button 
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                            >
                                فهمت وإغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivacyPolicyCheckbox;