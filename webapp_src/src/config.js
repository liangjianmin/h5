import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/home/Index'], resolve)
const Regular = resolve => require(['@/views/regular/Index'], resolve)
const RegularDetail = resolve => require(['@/views/regular/Detail'], resolve)
const StandardDetail = resolve => require(['@/views/standard/Detail'], resolve)
const TransferDetail = resolve => require(['@/views/transfer/Detail'], resolve)
const Risk = resolve => require(['@/views/regular/Risk'], resolve)
const InvestSuccess = resolve => require(['@/views/regular/InvestSuccess'], resolve)
const StandardSuccess = resolve => require(['@/views/standard/InvestSuccess'], resolve)
const TransferSuccess = resolve => require(['@/views/transfer/InvestSuccess'], resolve)
const SecurityBankCustody = resolve => require(['@/views/about/SecurityBankCustody'], resolve)
const SecurityRiskProcess = resolve => require(['@/views/about/SecurityRiskProcess'], resolve)
const SecurityBusinessIntroduction = resolve => require(['@/views/about/SecurityBusinessIntroduction'], resolve)
const SecurityRiskWay = resolve => require(['@/views/about/SecurityRiskWay'], resolve)
const NewPerson = resolve => require(['@/views/about/NewPerson'], resolve)
const Company = resolve => require(['@/views/about/Company'], resolve)
const Report = resolve => require(['@/views/about/Report'], resolve)
const Signature = resolve => require(['@/views/about/Signature'], resolve)
const Insurance = resolve => require(['@/views/about/Insurance'], resolve)
const Associate = resolve => require(['@/views/user/Associate'], resolve)
const AssociateSuccess = resolve => require(['@/views/user/AssociateSuccess'], resolve)
const UserRebind = resolve => require(['@/views/user/Rebind'], resolve)
const UserDetail = resolve => require(['@/views/user/Detail'], resolve)
const UserActivityCenter = resolve => require(['@/views/user/ActivityCenter'], resolve)
const InvestmentDetails = resolve => require(['@/views/user/InvestmentDetails'], resolve)
const AssetsDetails = resolve => require(['@/views/user/AssetsDetails'], resolve)
const AutoVoteText = resolve => require(['@/views/user/AutoVoteText'], resolve)
const AdvanceeExit = resolve => require(['@/views/regular/AdvanceeExit'], resolve)
const PwdManage = resolve => require(['@/views/user/PwdManage'], resolve)
const Download = resolve => require(['@/views/about/Download'], resolve)
const PlanIntroduction = resolve => require(['@/views/regular/PlanIntroduction'], resolve)
const Repayments = resolve => require(['@/views/user/Repayments'], resolve)
const RepaymentsDetail = resolve => require(['@/views/user/RepaymentsDetail'], resolve)
const Fanli = resolve => require(['@/views/channel/Fanli'], resolve)
const TransferList = resolve => require(['@/views/user/TransferList'], resolve)
const ApplicationTransfer = resolve => require(['@/views/transfer/ApplicationTransfer'], resolve)
const RepaymentsPlan = resolve => require(['@/views/user/RepaymentsPlan'], resolve)
const PlanDetail = resolve => require(['@/views/regular/PlanDetail'], resolve)
const BatchDetail = resolve => require(['@/views/batch/Detail'], resolve)
const MatchStatus = resolve => require(['@/views/batch/MatchStatus'], resolve)
const BatchInvestSuccess = resolve => require(['@/views/batch/InvestSuccess'], resolve)
const BatchList = resolve => require(['@/views/batch/List'], resolve)
const BespeakDetail = resolve => require(['@/views/bespeak/Detail'], resolve)
const BespeakSuccess = resolve => require(['@/views/bespeak/InvestSuccess'], resolve)
const BespeakList = resolve => require(['@/views/user/BespeakList'], resolve)
const MineBespeak = resolve => require(['@/views/user/MineBespeak'], resolve)
const Reward = resolve => require(['@/views/user/Reward'], resolve)
const NoviceDetail = resolve => require(['@/views/novice/Detail'], resolve)
const NoviceSuccess = resolve => require(['@/views/novice/InvestSuccess'], resolve)
const Sa = resolve => require(['@/views/activity/Sa'], resolve)
const Reports = resolve => require(['@/views/about/Reports'], resolve)
const ReportsRealTime = resolve => require(['@/views/about/ReportsRealTime'], resolve)
const Balance = resolve => require(['@/views/user/Balance'], resolve)
/*存管*/
const OpenAccount = resolve => require(['@/views/bank/OpenAccount'], resolve)
const OpenAccountSuccess = resolve => require(['@/views/bank/OpenAccountSuccess'], resolve)
const Recharge = resolve => require(['@/views/bank/Recharge'], resolve)
const RechargeGuide = resolve => require(['@/views/bank/RechargeGuide'], resolve)
const RechargeDescription = resolve => require(['@/views/bank/RechargeDescription'], resolve)
const RechargeLimit = resolve => require(['@/views/bank/RechargeLimit'], resolve)
const RechargeSuccess = resolve => require(['@/views/bank/RechargeSuccess'], resolve)
const Withdraw = resolve => require(['@/views/bank/Withdraw'], resolve)
const WithdrawDescription = resolve => require(['@/views/bank/WithdrawDescription'], resolve)
const WithdrawSuccess = resolve => require(['@/views/bank/WithdrawSuccess'], resolve)
const BankInfo = resolve => require(['@/views/bank/BankInfo'], resolve)
const Unbundled = resolve => require(['@/views/bank/Unbundled'], resolve)
const UnbundledAudit = resolve => require(['@/views/bank/UnbundledAudit'], resolve)
const Callback = resolve => require(['@/views/bank/Callback'], resolve)
const SignPageSuccess = resolve => require(['@/views/bank/SignPageSuccess'], resolve)
const RegisterSuccess = resolve => require(['@/views/user/RegisterSuccess'], resolve)
const UserSettingInfo = resolve => require(['@/views/user/UserSettingInfo'], resolve)
const TransactionPwd = resolve => require(['@/views/bank/TransactionPwd'], resolve)
const ModifyMobile = resolve => require(['@/views/bank/ModifyMobile'], resolve)
const Waiting = resolve => require(['@/views/bank/Waiting'], resolve)
const AgreementInfo = resolve => require(['@/views/user/AgreementInfo'], resolve)
const Signing = resolve => require(['@/views/bank/Signing'], resolve)
/*信息披露*/
const InformationIndex = resolve => require(['@/views/information/Index'], resolve)
const RiskManage = resolve => require(['@/views/information/RiskManage'], resolve)
const Charges = resolve => require(['@/views/information/Charges'], resolve)
const MajorIssues = resolve => require(['@/views/information/MajorIssues'], resolve)
const Policies = resolve => require(['@/views/information/Policies'], resolve)
const Promise = resolve => require(['@/views/information/Promise'], resolve)
const Organization = resolve => require(['@/views/information/Organization'], resolve)
const Audit = resolve => require(['@/views/information/Audit'], resolve)
const Record = resolve => require(['@/views/information/Record'], resolve)
/*安全保障*/
const SafeIndex = resolve => require(['@/views/safe/Index'], resolve)
const SafeBank = resolve => require(['@/views/safe/Bank'], resolve)
const SafeSignature = resolve => require(['@/views/safe/Signature'], resolve)
const SafeInsurance = resolve => require(['@/views/safe/Insurance'], resolve)
const SafeAssetQuality = resolve => require(['@/views/safe/AssetQuality'], resolve)
const SafeSecurity = resolve => require(['@/views/safe/Security'], resolve)
const SafeSecuritySystem = resolve => require(['@/views/safe/SecuritySystem'], resolve)
const SafeRiskManage = resolve => require(['@/views/safe/RiskManage'], resolve)
const ContactUs = resolve => require(['@/views/about/ContactUs'], resolve)

Vue.use(Router)
export default new Router({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {
            path: '/home',
            name: '多啦聚财官网',
            component: Home
        },
        {
            path: '/regular',
            name: '投资',
            component: Regular
        },
        {
            path: '/regular/detail/:id',
            name: '项目详情',
            component: RegularDetail
        },
        {
            path: '/standard/detail/:id',
            name: '项目详情',
            component: StandardDetail
        },
        {
            path: '/transfer/detail/:id',
            name: '债转详情',
            component: TransferDetail
        },
        {
            path: '/about/risk',
            name: '风险提示',
            component: Risk
        },
        {
            path: '/about/securitybankcustody',
            name: '银行存管',
            component: SecurityBankCustody
        },
        {
            path: '/about/securityriskprocess',
            name: '智能风控',
            component: SecurityRiskProcess
        },
        {
            path: '/about/securitybusinessintroduction',
            name: '业务介绍',
            component: SecurityBusinessIntroduction
        },
        {
            path: '/about/securityriskway',
            name: '保障方式',
            component: SecurityRiskWay
        },
        {
            path: '/about/newperson',
            name: '新手指引',
            component: NewPerson
        },
        {
            path: '/about/company',
            name: '平台介绍',
            component: Company
        },
        {
            path: '/about/report',
            name: '运营报告',
            component: Report
        },
        {
            path: '/about/reports',
            name: '运营报告',
            component: Reports
        },
        {
            path: '/about/reports_realtime',
            name: '运营报告',
            component: ReportsRealTime
        },
        {
            path: '/about/signature',
            name: '电子签章',
            component: Signature
        },
        {
            path: '/about/insurance',
            name: '众安保险',
            component: Insurance
        },
        {
            path: '/investsuccess',
            name: '投资确认',
            component: InvestSuccess
        },
        {
            path: '/standardsuccess',
            name: '投资确认',
            component: StandardSuccess
        },
        {
            path: '/transfersuccess',
            name: '投资确认',
            component: TransferSuccess
        },
        {
            path: '/associate',
            name: '关联账户',
            component: Associate
        },
        {
            path: '/associate/success',
            name: '关联成功',
            component: AssociateSuccess
        },
        {
            path: '/user/rebind',
            name: '修改手机号',
            component: UserRebind
        },
        {
            path: '/user/detail',
            name: '个人中心-我的资产',
            component: UserDetail
        },
        {
            path: '/user/activity',
            name: '活动中心',
            component: UserActivityCenter
        },
        {
            path: '/user/investmentdetails',
            name: '投资明细',
            component: InvestmentDetails
        },
        {
            path: '/user/assetsdetails',
            name: '资产明细',
            component: AssetsDetails
        },
        {
            path: '/user/autovotetext',
            name: '自动续投',
            component: AutoVoteText
        },
        {
            path: '/regular/advanceeexit',
            name: '提前退出',
            component: AdvanceeExit
        },
        {
            path: '/user/pwdmanage',
            name: '密码管理',
            component: PwdManage
        },
        {
            path: '/user/transferlist',
            name: '转让专区',
            component: TransferList
        },
        {
            path: '/about/download',
            name: '下载',
            component: Download
        },
        {
            path: '/regular/introduction',
            name: '随心投介绍',
            component: PlanIntroduction
        },
        {
            path: '/fanli',
            name: '投资',
            component: Fanli
        },
        {
            path: '/repayments',
            name: '回款日历',
            component: Repayments
        },
        {
            path: '/transfer/application',
            name: '申请转让',
            component: ApplicationTransfer
        },
        {
            path: '/repaymentsdetail',
            name: '回款明细',
            component: RepaymentsDetail
        },
        {
            path: '/repaymentsplan',
            name: '回款计划',
            component: RepaymentsPlan
        },
        {
            path: '/plandetail',
            name: '投资详情',
            component: PlanDetail
        },
        {
            path: '/batch/detail',
            name: '一键投标详情',
            component: BatchDetail
        },
        {
            path: '/batch/matchstatus',
            name: '一键投标匹配',
            component: MatchStatus
        },
        {
            path: '/batch/investSuccess',
            name: '投资确认',
            component: BatchInvestSuccess
        },
        {
            path: '/batch/list',
            name: '列表可投',
            component: BatchList
        },
        {
            path: '/bank/open_account',
            name: '开户',
            component: OpenAccount
        },
        {
            path: '/bank/open_account_success',
            name: '开户成功',
            component: OpenAccountSuccess
        },
        {
            path: '/bank/recharge',
            name: '充值',
            component: Recharge
        },
        {
            path: '/bank/recharge/guide',
            name: '转账充值指引',
            component: RechargeGuide
        },
        {
            path: '/bank/recharge_description',
            name: '充值说明',
            component: RechargeDescription
        },
        {
            path: '/bank/recharge_limit',
            name: '银行限额',
            component: RechargeLimit
        },
        {
            path: '/bank/recharge_success',
            name: '充值结果',
            component: RechargeSuccess
        },
        {
            path: '/bank/withdraw',
            name: '提现',
            component: Withdraw
        },
        {
            path: '/bank/withdraw_description',
            name: '提现说明',
            component: WithdrawDescription
        },
        {
            path: '/bank/withdraw_success',
            name: '提现成功',
            component: WithdrawSuccess
        },
        {
            path: '/bank/info',
            name: '银行卡信息',
            component: BankInfo
        },
        {
            path: '/bank/unbundled',
            name: '解绑银行卡',
            component: Unbundled
        },
        {
            path: '/bank/unbundled_audit',
            name: '审核银行卡',
            component: UnbundledAudit
        },
        {
            path: '/bank/callback',
            name: '',
            component: Callback
        },
        {
            path: '/user/register_success',
            name: '注册成功',
            component: RegisterSuccess
        },
        {
            path: '/user/user_setting_info',
            name: '用户信息',
            component: UserSettingInfo
        },
        {
            path: '/bank/sign_page_success',
            name: '签约',
            component: SignPageSuccess
        },
        {
            path: '/bank/transaction_pwd',
            name: '密码管理',
            component: TransactionPwd
        },
        {
            path: '/bank/modify_mobile',
            name: '修改电子帐号手机号',
            component: ModifyMobile
        },
        {
            path: '/bank/agreement_info',
            name: '投资授权协议',
            component: AgreementInfo
        },
        {
            path: '/bank/waiting',
            name: '等待页面',
            component: Waiting
        },
        {
            path: '/information/index',
            name: '信息披露',
            component: InformationIndex
        },
        {
            path: '/information/riskmanage',
            name: '风险管理',
            component: RiskManage
        },
        {
            path: '/information/charges',
            name: '收费标准',
            component: Charges
        },
        {
            path: '/information/majorissues',
            name: '重大事件',
            component: MajorIssues
        },
        {
            path: '/information/policies',
            name: '政策法规',
            component: Policies
        },
        {
            path: '/information/promise',
            name: '承诺函',
            component: Promise
        },
        {
            path: '/information/audit',
            name: '审计信息',
            component: Audit
        },
        {
            path: '/information/organization',
            name: '机构信息',
            component: Organization
        },
        {
            path: '/information/record',
            name: '备案信息',
            component: Record
        },
        {
            path: '/safe/index',
            name: '安全保障',
            component: SafeIndex
        },
        {
            path: '/safe/bank',
            name: '银行存管',
            component: SafeBank
        },
        {
            path: '/safe/signature',
            name: '电子签章',
            component: SafeSignature
        },
        {
            path: '/safe/insurance',
            name: '众安保险',
            component: SafeInsurance
        },
        {
            path: '/safe/assetquality',
            name: '资产优质',
            component: SafeAssetQuality
        },
        {
            path: '/safe/security',
            name: '保障体系',
            component: SafeSecurity
        },
        {
            path: '/safe/securitysystem',
            name: '风控系统',
            component: SafeSecuritySystem
        },
        {
            path: '/safe/riskmanage',
            name: '信息安全',
            component: SafeRiskManage
        },
        {
            path: '/about/contactus',
            name: '联系我们',
            component: ContactUs
        },
        {
            path: '/bespeak/detail',
            name: '预约投标',
            component: BespeakDetail
        },
        {
            path: '/bespeak/success',
            name: '预约结果',
            component: BespeakSuccess
        },
        {
            path: '/user/bespeaklist',
            name: '我的预约',
            component: BespeakList
        },
        {
            path: '/user/minebespeak',
            name: '预约投标',
            component: MineBespeak
        },
        {
            path: '/user/reward',
            name: '我的奖励',
            component: Reward
        },
        {
            path: '/novice/detail/:id',
            name: '新手专享',
            component: NoviceDetail
        },
        {
            path: '/novice/success',
            name: '投资成功',
            component: NoviceSuccess
        },
        {
            path: '/bank/signing',
            name: '签约',
            component: Signing
        },
        {
            path: '/user/balance',
            name: '余额自动复投',
            component: Balance
        },
        {
            path: '/sa',
            name: '',
            component: Sa
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
