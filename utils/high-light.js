export function highLightMsg(msg, highLightStr) {
		if (msg == null) {
			msg = ''
		}
		if (highLightStr == null) {
			highLightStr = ''
		}
		if (msg instanceof Object) {
			msg = JSON.stringify(msg)
		}
		if (highLightStr instanceof Object) {
			highLightStr = JSON.stringify(highLightStr)
		}
		if (!(msg instanceof String)) {
			msg = msg.toString()
		}
		if (!(highLightStr instanceof String)) {
			highLightStr = highLightStr.toString()
		}
		var htmlStr = ''
		if (highLightStr.length > 0) {
			if (msg.indexOf(highLightStr) !== -1) {
				assemblyStr(msg, highLightStr)
			} else {
				htmlStr = '<span>' + msg + '</span>'
			}
		} else {
			htmlStr = '<span>' + msg + '</span>'
		}

		function assemblyStr(msgAssembly, highLightAssembly) {
			if (msgAssembly.indexOf(highLightAssembly) !== -1) {
				var length = highLightAssembly.length
				var start = msgAssembly.indexOf(highLightAssembly)
				htmlStr = htmlStr + '<span>' + msgAssembly.substring(0, start) + '</span>' + '<span class="high-light">' +
					highLightAssembly + '</span>'
				msgAssembly = msgAssembly.substring(start + length, msgAssembly.length)
				assemblyStr(msgAssembly, highLightAssembly)
			} else {
				htmlStr = htmlStr + '<span>' + msgAssembly + '</span>'
			}
		}
		return htmlStr
	}
