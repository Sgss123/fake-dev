// 纯 JavaScript 实现的占位图像生成器

exports.image = async (request, matches) => {
    // 从正则表达式匹配结果中提取参数
    let width = parseInt(matches[1], 10);
    let height = parseInt(matches[2], 10);
    let format = matches[3] || 'png';

    // 确保格式是有效的
    format = format.toLowerCase();
    if (format !== 'png' && format !== 'jpg' && format !== 'jpeg') {
        format = 'png';
    }

    // 创建一个简单的彩色图像，使用 Cloudflare 的 Response.arrayBuffer
    const contentType = format === 'png' ? 'image/png' : 'image/jpeg';

    // 生成一个简单的 1x1 像素彩色图像，然后通过 ImageBitmap 调整大小
    // 为了简单起见，我们返回一个由 Cloudflare Images 提供的占位图像 URL

    // 创建包含尺寸文本的图像 URL
    const placeholderUrl = `https://placehold.co/${width}x${height}.${format}?text=${width} x ${height}.${format}`;

    try {
        // 获取占位图像
        const imageResponse = await fetch(placeholderUrl);

        if (!imageResponse.ok) {
            throw new Error(`Failed to fetch placeholder image: ${imageResponse.statusText}`);
        }

        // 读取图像数据
        const imageBuffer = await imageResponse.arrayBuffer();

        // 返回 Cloudflare Workers Response 对象
        return new Response(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400'
            }
        });
    } catch (error) {
        console.error('Error generating image:', error);

        // 出错时返回纯文本响应
        return new Response(`Error: Could not generate ${width}x${height} image`, {
            status: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};
