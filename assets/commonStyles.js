import { colors } from "./colors/colors"

const container = { flex: 1, backgroundColor: colors.bgColor, padding: 15 }

const textLight10  = { fontSize: 10, fontFamily: 'ms-light', color: colors.textColorPri }
const textLight12 = { fontSize: 12, fontFamily: 'ms-light', color: colors.textColorPri }
const textLight14 = { fontSize: 14, fontFamily: 'ms-light', color: colors.textColorPri }
const textRegular10 = { fontSize: 10, fontFamily: 'ms-regular', color: colors.textColorPri }
const textRegular12 = { fontSize: 12, fontFamily: 'ms-regular', color: colors.textColorPri }
const textRegular14 = { fontSize: 14, fontFamily: 'ms-regular', color: colors.textColorPri }
const textSemiBold10 = { fontSize: 10, fontFamily: 'ms-semibold', color: colors.textColorPri }
const textSemiBold12 = { fontSize: 12, fontFamily: 'ms-semibold', color: colors.textColorPri }
const textSemiBold14 = { fontSize: 14, fontFamily: 'ms-semibold', color: colors.textColorPri }

const bottomSheetContainer = { flexGrow: 1, backgroundColor: colors.bgColor, paddingHorizontal: 20, paddingVertical: 10 }
const bottomSheetTitleTextStyles = { fontSize: 18, fontFamily: 'ms-semibold', color: colors.textColorPri, textAlign: 'center', marginBottom: 10 }
const bottomSheetContentWrapper = { marginTop: 5, paddingHorizontal: 5 }

const textAlignRight = { textAlign: 'right' }
const textAlignLeft = { textAlign: 'left' }
const textAlignCenter = { textAlign: 'center' }
const textAlignJustify = { textAlign: 'justify' }

const justifyCenter = { justifyContent: 'center', alignItems: 'center', textAlign: 'center' }
const justifyBetween = { justifyContent: 'space-between', alignItems: 'center'}
const alignCenter = { alignItems: 'center' }

const margin5 = { margin: 5 }
const margin10 = { margin: 10 }
const margin15 = { margin: 15 }
const marginLeft2 = { marginLeft: 2 }
const marginTop5 = { marginTop: 5 }
const marginTop10 = { marginTop: 10 }
const marginTop15 = { marginTop: 15 }
const marginRight5 = { marginRight: 5 }
const marginRight10 = { marginRight: 10 }
const marginRight15 = { marginRight: 15 }
const marginBottom5 = { marginBottom: 5 }
const marginBottom10 = { marginBottom: 10 }
const marginBottom15 = { marginBottom: 15 }
const marginLeft5 = { marginLeft: 5 }
const marginLeft10 = { marginLeft: 10 }
const marginLeft15 = { marginLeft: 15 }
const marginVertical5 = { marginVertical: 5 }
const marginVertical10 = { marginVertical: 10 }
const marginVertical15 = { marginVertical: 15 }
const marginHorizontal2 = { marginHorizontal: 2 }
const marginHorizontal5 = { marginHorizontal: 5 }
const marginHorizontal10 = { marginHorizontal: 10 }
const marginHorizontal15 = { marginHorizontal: 15 }

const padding5 = { padding: 5 }
const padding10 = { padding: 10 }
const padding15 = { padding: 15 }
const paddingTop5 = { paddingTop: 5 }
const paddingTop10 = { paddingTop: 10 }
const paddingTop15 = { paddingTop: 15 }
const paddingRight5 = { paddingRight: 5 }
const paddingRight10 = { paddingRight: 10 }
const paddingRight15 = { paddingRight: 15 }
const paddingBottom5 = { paddingBottom: 5 }
const paddingBottom10 = { paddingBottom: 10 }
const paddingBottom15 = { paddingBottom: 15 }
const paddingLeft5 = { paddingLeft: 5 }
const paddingLeft10 = { paddingLeft: 10 }
const paddingLeft15 = { paddingLeft: 15 }
const paddingVertical5 = { paddingVertical: 5 }
const paddingVertical10 = { paddingVertical: 10 }
const paddingVertical15 = { paddingVertical: 15 }
const paddingHorizontal5 = { paddingHorizontal: 5 }
const paddingHorizontal10 = { paddingHorizontal: 10 }
const paddingHorizontal15 = { paddingHorizontal: 15 }

const flex1 = { flex: 1 } 
const flex2 = { flex: 2 } 
const flex3 = { flex: 3 } 
const flex4 = { flex: 4 } 
const flex5 = { flex: 5 } 
const flexGrow1 = { flexGrow: 1 }
const flexRow = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
const flexRowEnd = { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }
const flexWrapper = { flexDirection: 'row', flexWrap: 'wrap' }

const labelTextStyles = { marginBottom: 5, marginLeft: 2, fontFamily: 'ms-light', fontSize: 12, color: colors.textColorPri }

const alertWrapper = { zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }

const w100 = {width: '100%'}
const w50 = {width: '50%'}
const w25 = {width: '25%'}

const btnColorSet = {
    set_1: [
        '#240750',
        '#006769',
        '#344C64',
        '#A91D3A',
        '#7469B6',
        '#32012F',
        '#153448',
    ],
    set_2: [
        '#074173',
        '#A34343',
        '#102C57',
        '#803D3B',
    ],
};

const hidePwStyles = { position: 'absolute', right: 15, top: 12, }

const borderTop = { borderTopWidth: 1, borderTopColor: colors.border }
const borderBottom = { borderBottomWidth: 1, borderBottomColor: colors.border }
const borderLeft = { borderLeftWidth: 1, borderLeftColor: colors.border }
const borderRight = { borderRightWidth: 1, borderRightColor: colors.border }
const borderVertical = { borderTopWidth: 1, borderTopColor: colors.border, borderBottomWidth: 1, borderBottomColor: colors.border }
const borderHorizontal = { borderLeftWidth: 1, borderLeftColor: colors.border, borderRightWidth: 1, borderRightColor: colors.border }
const borderTopDark = { borderTopWidth: 0.5, borderTopColor: colors.textColorSec }
const borderBottomDark = { borderBottomWidth: 0.5, borderBottomColor: colors.textColorSec }
const borderLeftDark = { borderLeftWidth: 0.5, borderLeftColor: colors.textColorSec }
const borderRightDark = { borderRightWidth: 0.5, borderRightColor: colors.textColorSec }
const borderVerticalDark = { borderTopWidth: 0.5, borderTopColor: colors.textColorSec, borderBottomWidth: 1, borderBottomColor: colors.border }
const borderHorizontalDark = { borderLeftWidth: 0.5, borderLeftColor: colors.textColorSec, borderRightWidth: 1, borderRightColor: colors.border }
const borderRound5 = { borderWidth: 1, borderColor: colors.border, borderRadius: 5 }
const borderRound10 = { borderWidth: 1, borderColor: colors.border, borderRadius: 10 }
const borderRound50 = { borderWidth: 1, borderColor: colors.border, borderRadius: 50 }

export { 
    flex1,
    flex2,
    flex3,
    flex4,
    flex5,
    flexGrow1,
    flexRow,
    flexRowEnd,
    flexWrapper,
    container,
    textLight10,
    textLight12,
    textLight14,
    textRegular10,
    textRegular12,
    textRegular14,
    textSemiBold10,
    textSemiBold12,
    textSemiBold14,
    textAlignRight,
    textAlignLeft,
    textAlignCenter,
    textAlignJustify,
    justifyCenter,
    justifyBetween,
    alignCenter,
    margin5,
    margin10,
    margin15,
    marginLeft2,
    marginTop5,
    marginTop10,
    marginTop15,
    marginRight5,
    marginRight10,
    marginRight15,
    marginBottom5,
    marginBottom10,
    marginBottom15,
    marginLeft5,
    marginLeft10,
    marginLeft15,
    marginVertical5,
    marginVertical10,
    marginVertical15,
    marginHorizontal2,
    marginHorizontal5,
    marginHorizontal10,
    marginHorizontal15,
    padding5,
    padding10,
    padding15,
    paddingTop5,
    paddingTop10,
    paddingTop15,
    paddingRight5,
    paddingRight10,
    paddingRight15,
    paddingBottom5,
    paddingBottom10,
    paddingBottom15,
    paddingLeft5,
    paddingLeft10,
    paddingLeft15,
    paddingVertical5,
    paddingVertical10,
    paddingVertical15,
    paddingHorizontal5,
    paddingHorizontal10,
    paddingHorizontal15,
    bottomSheetContainer,
    bottomSheetTitleTextStyles,
    bottomSheetContentWrapper,
    labelTextStyles,
    alertWrapper,
    btnColorSet,
    w100,
    w50,
    w25,
    hidePwStyles, 
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    borderVertical,
    borderHorizontal,
    borderRound5,
    borderRound10,
    borderRound50,

    borderTopDark,
    borderBottomDark,
    borderLeftDark,
    borderRightDark,
    borderVerticalDark,
    borderHorizontalDark,
 }
