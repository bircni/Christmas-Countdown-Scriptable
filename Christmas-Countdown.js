//Code for Scriptable
let dateForXmas = ''
let icon = '🎄';
let showDate = true
let widgetInputYear = new Date().getFullYear();
let widgetInputXmas = "-12-24";
let widgetInput = null;
let widgetInputDate = null;
let widgetInputParameter = args.widgetParameter;
let widgetInputUrl = "https://i.imgur.com/HSljMPe.jpg";
let textColor = '111111'
let XmasTextColor = "c90000"


widgetInputDate = widgetInputYear + widgetInputXmas;
widgetInput = widgetInputDate.toString().split(";");
dateForXmas = widgetInput[0].trim()

const localeDay = {
    default: ['Day', 'Days'],
    en: ['Day', 'Days'],
    de: ['Tag', 'Tage'],
    fr: ['Jour', 'Jours']
}

const localeHour = {
    default: ['hours', 'hour'],
    en: ['hours', 'hour'],
    de: ['Stunden', 'Stunde'],
    fr: ['heures', 'heure']
}

const localeMinute = {
    default: ['minutes'],
    en: ['minutes'],
    de: ['Minuten'],
    fr: ['minutes']
}

const localeXmas = {
    default: ['Christmas'],
    en: ['Christmas'],
    de: ['Weihnachten'],
    fr: ['Noël']
}

const localeHX = {
    default: ['Merry'],
    en: ['Merry'],
    de: ['Frohe'],
    fr: ['Joyeux']
}

const localeXmasT = {
    default: ['Christmas'],
    en: ['Christmas'],
    de: ['Weihnachten'],
    fr: ['Noël']
}

const localeUntil = {
    default: ['until Christmas'],
    en: ['until Christmas'],
    de: ['bis Weihnachten'],
    fr: ['à Noël']
}

const languageCode = Device.preferredLanguages()[0].match(/^[\a-z]{2}/)
const HXtext = (localeHX[languageCode]) ? localeHX[languageCode] : localeHX.default
const days = (localeDay[languageCode]) ? localeDay[languageCode] : localeDay.default
const xmasTitle = (localeXmas[languageCode]) ? localeXmas[languageCode] : localeXmas.default
const UntilText = (localeUntil[languageCode]) ? localeUntil[languageCode] : localeUntil.default
const XmasText = (localeXmasT[languageCode]) ? localeXmasT[languageCode] : localeXmasT.default
const hours = (localeHour[languageCode]) ? localeHour[languageCode] : localeHour.default

////////////////////////////////////////////////////////////////////////////////

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

// Create Widget
let remainingDays = getTimeRemaining(dateForXmas).days + 1;
let remainingHours = getTimeRemaining(dateForXmas).hours;
let remainingMinutes = getTimeRemaining(dateForXmas).minutes;
let rH = remainingHours + remainingDays * 24;
let rM = remainingDays * 24 + remainingHours * 60;
if (remainingDays < 0) {
    var addDays = parseInt(widgetInputYear)
    {
        if (addDays % 4 == 0) {
            if (addDays % 100 == 0) {
                if (addDays % 400 == 0) {
                    addDays = 366;
                } else {
                    addDays = 365;
                }
            } else {
                addDays = 366;
            }
        } else {
            addDays = 365;
        }
    }

    remainingDays = remainingDays + addDays;
}
let widget = new ListWidget();
widget.setPadding(10, 10, 10, 10)
//Background-Image
if (widgetInputParameter != null && widgetInputParameter.length > 5) {
    let imgR = new Request(widgetInputParameter)
    let img = await imgR.loadImage()
    widget.backgroundImage = img
} else {
    let imgQ = new Request(widgetInputUrl)
    let imgN = await imgQ.loadImage()
    widget.backgroundImage = imgN
}
//Day-Checker

if (remainingDays != 0) {
    if (Device.isPhone()) {
        let provider = widget.addText(icon + xmasTitle)
        provider.font = Font.boldMonospacedSystemFont(12)
        provider.centerAlignText()
        provider.textColor = new Color(textColor)
    }
    if (Device.isPad()) {
        let provider = widget.addText(icon + xmasTitle + icon)
        provider.font = Font.boldMonospacedSystemFont(12)
        provider.centerAlignText()
        provider.textColor = new Color(textColor)
    }

    widget.addSpacer()

    let textStack = widget.addStack();
    textStack.layoutHorizontally()
// if (Device.isPad())
// {
// textStack.addSpacer()
// }
    textStack.addSpacer(6)
    textStack.centerAlignContent()
    textStack.addSpacer(5)


//textStack.addSpacer()

    if (remainingDays < 4) {
        let remainingDays2 = remainingDays - 1
        let remainingH = remainingHours + remainingDays2 * 24
        let daysText = textStack.addText(`${remainingH}`)
        daysText.minimumScaleFactor = 0.5;
        daysText.textColor = new Color(textColor)
        if (Device.isPhone()) {
            textStack.addSpacer(5)
        }
        if (Device.isPad()) {
            textStack.addSpacer(30)
        }
        let postfixText
        if (remainingH > 1) {
            postfixText = textStack.addText(hours[0])
        } else {
            postfixText = textStack.addText(hours[1])
        }
        postfixText.rightAlignText()
        postfixText.textColor = new Color(textColor)
        widget.addSpacer(20)
        if (remainingH > 10) {
            daysText.font = Font.boldMonospacedSystemFont(40)
            daysText.leftAlignText()
            postfixText.font = Font.boldMonospacedSystemFont(16)
        } else {
            daysText.font = Font.boldMonospacedSystemFont(50)
            postfixText.font = Font.boldMonospacedSystemFont(20)
        }
    } else {
        let daysText = textStack.addText(`${remainingDays}`)
        daysText.minimumScaleFactor = 0.5;
        daysText.textColor = new Color(textColor)
        if (Device.isPhone()) {
            textStack.addSpacer(5)
        }
        if (Device.isPad()) {
            textStack.addSpacer(10)
        }
        let postfixText = textStack.addText(days[1])
        postfixText.rightAlignText()
        postfixText.textColor = new Color(textColor)
        widget.addSpacer(10)
        if (Device.isPad) {
            postfixText.font = Font.boldMonospacedSystemFont(25)
            daysText.font = Font.boldMonospacedSystemFont(50)
        } else {
            postfixText.font = Font.boldMonospacedSystemFont(20)
            daysText.font = Font.boldMonospacedSystemFont(30)
            postfixText.leftAlignText()
        }
    }

    let until = widget.addText(UntilText + "")
    until.font = Font.boldMonospacedSystemFont(13)
    until.leftAlignText()
    until.centerAlignText()
    until.textColor = new Color(textColor)//
    widget.addSpacer(10)
    if (remainingDays > 100) {
        daysText.font = Font.boldMonospacedSystemFont(40)
        daysText.leftAlignText()
        postfixText.font = Font.boldMonospacedSystemFont(20)
    }


}

// Christmas
if (remainingDays === 0) {
    widget.addSpacer(25)
    let HXText = widget.addText("" + HXtext)
    HXText.font = Font.boldRoundedSystemFont(20)
    HXText.textColor = new Color(XmasTextColor)
    HXText.centerAlignText()
    widget.addSpacer(3)
    let XMASText = widget.addText("" + XmasText)
    XMASText.textColor = new Color(XmasTextColor)
    XMASText.font = Font.boldRoundedSystemFont(20)
    widget.addSpacer(10)
    let IconText = widget.addText("" + icon + icon)
    IconText.font = Font.regularSystemFont(58)
    IconText.textColor = new Color(XmasTextColor)
}

let Widget = new ListWidget()
if (!config.runsInWidget) {
    await widget.presentSmall()
}

// Show Widget.
Script.setWidget(widget)
Script.complete()