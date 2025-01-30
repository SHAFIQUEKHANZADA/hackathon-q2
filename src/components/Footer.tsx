import { useTranslations } from "next-intl";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const Footer = () => {
    const t = useTranslations('footer');
    return (
        <div className={`${poppins.className} md:h-[490px] lg:p-20 md:p-10 p-5 bg-white`}>
            <div className="flex flex-col">
                <div className="md:h-[312px] flex md:flex-row flex-col gap-10 md:gap-0">
                    <div className="flex-1">
                        <h1 className="text-[24px] font-bold text-black md:mb-10 mb-4">{t('Furniro')}</h1>
                        <p className="text-[16px] text-[#9F9F9F]">{t('para-one')}</p>
                    </div>
                    <div className="flex-1 md:pl-2 lg:ml-10">
                        <h1 className="text-[16px] md:mb-10 mb-4 font-semibold text-[#9F9F9F]">{t('Links')}</h1>
                        <ul className="flex flex-col md:gap-10 gap-3 text-black">
                            <Link href={"/"}><li className="text-[16px] font-semibold">{t('Home')}</li></Link>
                            <Link href={"/shop"}><li className="text-[16px] font-semibold">{t('Shop')}</li></Link>
                            <Link href={"/about"}><li className="text-[16px] font-semibold">{t('About')}</li></Link>
                            <Link href={"/contact"}><li className="text-[16px] font-semibold">{t('Contact')}</li></Link>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-semibold text-[#9F9F9F] md:mb-10 mb-4">{t('Help')}</h1>
                        <ul className="flex flex-col md:gap-10 gap-3 text-black">
                            <Link href={"/"}><li className="text-[16px] font-semibold">{t("Payment Options")}</li></Link>
                            <Link href={"/"}><li className="text-[16px] font-semibold">{t("Returns")}</li></Link>
                            <Link href={"/"}><li className="text-[16px] font-semibold">{t("Privacy Policies")}</li></Link>

                        </ul>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-semibold text-[#9F9F9F] md:mb-10 mb-4">
                            {t("Newsletter")}
                        </h1>
                        <div className="flex items-center mt-3 gap-2">
                            <input
                                type="email"
                                placeholder={t("placeHolder")}
                                className="border-b border-gray-400 pb-1 focus:outline-none focus:border-black text-[14px] w-full"
                            />
                            <button className="border-b pb-1 border-gray-400 text-black text-[14px] font-semibold">
                                {t("button")}
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col md:gap-10 gap-3 mt-20 md:mt-0">
            <div className="bg-[#000000] opacity-[30%]  h-[1px] w-full" />

            <h1>{t("h1-last")}</h1>
            </div>
        </div>

    )
}

export default Footer