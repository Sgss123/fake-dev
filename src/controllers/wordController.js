const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const config = require('../config');

exports.word = (request, matches) => {
	// 从正则表达式匹配结果中提取参数
	let num = parseInt(matches[1], 10);
	num = (num > config.MAX_WORD) ? config.MAX_WORD : num;

	let lorem = (new LoremIpsum()).generateWords(parseInt(num));

	// 检查是否需要返回数组格式
	if (matches[2] === ',') {
		lorem = lorem.split(' ');
	}

	// 返回 Cloudflare Workers Response 对象
	return new Response(
		JSON.stringify({ data: lorem }),
		{
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}
	);
}
