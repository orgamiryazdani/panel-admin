export function parseImages(images: string[]) {
    // اگر images یک آرایه بود، بررسی می‌کنیم که آیا نیاز به تبدیل دارد یا نه
    if (Array.isArray(images) && images.length > 0 && typeof images[0] === 'string' && images[0].includes('[')) {
        try {
            // تلاش برای پاک کردن کاراکترهای اضافی و سپس پارس کردن به JSON
            const cleanedString = '[' + images.join(',').replace(/^\[|]$/g, '') + ']';
            return JSON.parse(cleanedString);
        } catch (e) {
            // اگر پارس کردن با خطا مواجه شد، همان مقدار اولیه را برمی‌گردانیم
            return images;
        }
    }

    // اگر هیچ تبدیلی نیاز نبود، همان مقدار اولیه را برمی‌گردانیم
    return images;
}