import Vue from 'vue'
import dayjs from 'dayjs'

/* eslint-disable */
<% options.plugins.forEach(({ name, src, options = {} }) => { %>
import <%=name%> from '<%=src%>'
dayjs.extend(<%=name%>, <%= JSON.stringify(options)%>)
<% }) %>

<% if (options.locales) { %>
    <% options.locales.forEach(({ locale, path }) => { %>
import dayjsLocale<%=locale%> from '<%=path%>'
dayjs.locale('<%=locale%>', dayjsLocale<%=locale%>)
    <% }) %>
<% } %>
/* eslint-enable */

// Next line fixes relative time plugin
if (dayjs.en) {
    dayjs.Ls.en = { ...dayjs.Ls.en, ...dayjs.en }
}

// Switch to 'en' by default
dayjs.locale('en')

// Plugin for default string format
function defaultStringFormat(options, _dayjs) {
    // do not patch if no pattern provided
    if (!options.pattern) {
        return
    }

    const proto = _dayjs.prototype

    // parse all strings with given format, if not provided

    const _oldParse = proto.parse

    proto.parse = function(config) {
        const { date, args } = config
        const format = args[1]
        if (typeof date === 'string' && !format) {
            return _oldParse.call(this, { ...config, args: [ args[0], options.pattern ] })
        } else {
            return _oldParse.call(this, config)
        }
    }

    // format to given format if format string is empty

    if (options.format) {
        const _oldFormat = proto.format

        proto.format = function(formatString = options.pattern) {
            return _oldFormat.call(this, formatString)
        }
    }
}

dayjs.extend(defaultStringFormat, <%=JSON.stringify(options.stringFormat)%>)

export default function({ app: { i18n } }) {
    // add localization
    if (i18n) {
        // on switch
        const _oldOnLanguageSwitched = i18n.onLanguageSwitched
        i18n.onLanguageSwitched = async (oldLocale, newLocale) => {
            // call previous listener if exist
            await _oldOnLanguageSwitched(oldLocale, newLocale)
            dayjs.locale(newLocale)
        }

        dayjs.locale(i18n.locale)
    }

    Vue.prototype.$dayjs = dayjs
}
