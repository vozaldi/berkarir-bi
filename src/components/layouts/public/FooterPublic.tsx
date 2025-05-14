import { appConfig } from "@/lib/config";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoCall, IoLogoInstagram, IoLogoTiktok, IoLogoWhatsapp, IoMail } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  
};

function FooterPublic({
  className,
  ...props
}: Props) {
  return (
    <footer className={clsx("relative bg-black dark:bg-card", className)} {...props}>
      <div className="container relative z-10 px-8 mx-auto text-white pt-8 pb-4">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-6 md:col-span-4 hidden lg:block">
            <Image
              src={'/assets/images/app-logo-white.png'}
              alt={appConfig('company')}
              className="w-48 h-auto"
              width={242}
              height={96}
            />
          </div>

          <div className="grid grid-cols-12 gap-5 col-span-12 lg:col-span-8">
            <div className="col-span-6 md:col-span-4" />

            <div className="col-span-6 md:col-span-4" />

            <div className="col-span-6 md:col-span-4">
              <h5 className="font-bold uppercase">{`Contact Us`}</h5>

              <ul className="mt-2">
                {[{
                  label: appConfig('contact_phone'),
                  url: `tel:${appConfig('contact_phone')}`,
                  Icon: IoCall,
                }, {
                  label: appConfig('contact_email'),
                  url: `mailto:${appConfig('contact_email')}`,
                  Icon: IoMail,
                }].map((item, index) => (
                  <li className={clsx([!index ? '' : 'mt-1', 'text-sm'])} key={item.url}>
                    <Link href={item.url} className="inline-flex hover:underline">
                      <item.Icon size={18} className="mr-1" />

                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}

                <li className="mt-1 flex gap-x-2">
                  {[{
                    link: '#whatsapp',
                    Icon: IoLogoWhatsapp,
                  }, {
                    link: appConfig('url_instagram'),
                    Icon: IoLogoInstagram,
                  }, {
                    link: appConfig('url_tiktok'),
                    Icon: IoLogoTiktok,
                  }].map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      target="_blank"
                      className="hover:opacity-75"
                    >
                      <item.Icon size={24} />
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-800 dark:border-dark-300 text-sm text-center">
          <p className="font-semibold">
            {`Copyright 2019 © ${appConfig('company')}. All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPublic;
