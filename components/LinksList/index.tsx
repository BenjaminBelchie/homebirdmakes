"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function LinksList(props: {
  preloadedLinks: Preloaded<typeof api.links.list>;
}) {
  const links = usePreloadedQuery(props.preloadedLinks);


  return (
    <table className="w-4/5 border-collapse border border-[#e8e9eb]">
      <tbody>
        {links.map((link) => (
          <tr key={link.id} className="h-[35px] border border-[#e8e9eb] text-center leading-[1.5]">
            <td className="px-[14px] py-[10px] align-middle">
              <a className="text-[15px] text-[#3d4246] hover:underline" href={link.link}>
                {link.display_text}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
