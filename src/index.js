/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const word_controller = require('./controllers/wordController');

const sentence_controller = require('./controllers/sentenceController');

const paragraph_controller = require('./controllers/paragraphController');

const image_controller = require('./controllers/imageController');


export default {
	async fetch(request, env, ctx) {
		try {
			// 同时兼容两种 URL 模式
			const wordRegex1 = /\/(\d+)(?:w|word|words|dc)(,*)$/;  // /50w 格式
			const wordRegex2 = /\/(?:w|word|words|dc)(\d+)(,*)$/;  // /w50 格式

			const sentenceRegex1 = /\/(\d+)(?:s|sentence|sentences|jz)(,*)$/;  // /50s 格式
			const sentenceRegex2 = /\/(?:s|sentence|sentences|jz)(\d+)(,*)$/;  // /s50 格式

			const paragraphRegex1 = /\/(\d+)(?:p|paragraph|paragraphs|dl)(,*)$/;  // /50p 格式
			const paragraphRegex2 = /\/(?:p|paragraph|paragraphs|dl)(\d+)(,*)$/;  // /p50 格式

			const imageRegex = /\/(\d+)x(\d+)\.(jpg|jpeg|png)$/;


			const url = new URL(request.url);
			console.log(`处理请求: ${url.pathname}`);

			let response;
			let matches;

			// 处理词语请求
			if (wordRegex1.test(url.pathname) || wordRegex2.test(url.pathname)) {
				matches = url.pathname.match(wordRegex1) || url.pathname.match(wordRegex2);
				console.log(`匹配到词语模式，参数: ${matches[1]}, 格式: ${matches[2] ? '数组' : '字符串'}`);
				response = await word_controller.word(request, matches);
			}
			// 处理句子请求
			else if (sentenceRegex1.test(url.pathname) || sentenceRegex2.test(url.pathname)) {
				matches = url.pathname.match(sentenceRegex1) || url.pathname.match(sentenceRegex2);
				console.log(`匹配到句子模式，参数: ${matches[1]}, 格式: ${matches[2] ? '数组' : '字符串'}`);
				response = await sentence_controller.sentence(request, matches);
			}
			// 处理段落请求
			else if (paragraphRegex1.test(url.pathname) || paragraphRegex2.test(url.pathname)) {
				matches = url.pathname.match(paragraphRegex1) || url.pathname.match(paragraphRegex2);
				console.log(`匹配到段落模式，参数: ${matches[1]}, 格式: ${matches[2] ? '数组' : '字符串'}`);
				response = await paragraph_controller.paragraph(request, matches);
			}
			else if (imageRegex.test(url.pathname)) {
				const matches = url.pathname.match(imageRegex);
				console.log(`匹配到图片模式，尺寸: ${matches[1]}x${matches[2]}, 格式: ${matches[3] || 'png'}`);
				response = await image_controller.image(request, matches);
			}
			else {
				// 没有匹配的路由
				console.log('没有匹配的路由');
				return new Response(JSON.stringify({
					error: 'Not Found',
					message: '无效的路径，请使用 /{数字}w、/{数字}s、/{数字}p 或 /w{数字}、/s{数字}、/p{数字} 格式'
				}), {
					status: 404,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				});
			}

			// 确保返回有效的 Response 对象
			if (!response) {
				console.error('控制器未返回响应');
				return new Response(JSON.stringify({ error: '服务器错误' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			console.log(`响应状态码: ${response.status}`);
			return response;

		} catch (error) {
			// 捕获所有异常
			console.error('处理请求时发生错误:', error.message, error.stack);
			return new Response(JSON.stringify({
				error: '服务器错误',
				message: error.message
			}), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}
	}
};
