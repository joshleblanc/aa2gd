import FixedHeightList from './FixedHeightList';
import React from "react";
import ServerListItem from "./ServerListItem";
import Link from "next/link";

export default ({servers}) => {
    return (
      <FixedHeightList height={835}>
          {
              servers.map(s => {
                  return (
                    <Link key={s._id} href={`/server?id=${s._id}`}>
                        <ServerListItem button server={s} key={s.id} href={`/server?id=${s._id}`}/>
                    </Link>
                  )

              })
          }
      </FixedHeightList>

    )
}