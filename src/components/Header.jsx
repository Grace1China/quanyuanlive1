import { useState, useEffect, useLayoutEffect } from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useAppContext } from "../layouts/Default"
import { setToken, getToken, getRefreshToken, removeToken, removeRefreshToken } from "../utils/auth";
import { logout } from "../api/api";



import Logo from "./icons/Logo";
import { directus } from "../services/directus";

const Logout = () => {
  const { app, dispatch } = useAppContext();
  return (
    < a target="_blank" rel="noopener noreferrer" onClick={(e) => {
      e.preventDefault()
      logout(getRefreshToken()).then((res) => {
        window.history.pushState({}, '', '/')
        window.location.reload()
        dispatch({ type: "LOGOUT", playload: '' })
        removeToken()
        removeRefreshToken()
      }).catch(err => {
        console.log(err)
        throw err
      })
    }}>
      退出
    </a >
  )
}
const items = [
  {
    key: '1',
    label: <Logout />,
  },]

const UserMenu = ({ children }) => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {children}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}


export default function Header() {
  const [navs, setNavs] = useState(null);
  const { app, dispatch } = useAppContext();
  console.log('app', app)

  useEffect(() => {
    async function fetchData() {
      // let navsResp;
      directus.items('courseCat').readByQuery({
        fields: [
          "*",
        ],
      }
      ).then(resp => {
        console.log('catNav', resp)
        // navsResp = resp
        setNavs(resp.data)
      }).catch(err => {
        console.log(err)
        throw err
      })
    }
    fetchData()
  }, [])
  return (
    <header>
      <nav className="container">
        <div className="left">
          <a href="/">
            <Logo />
          </a>
          <ul className="menu">
            {
              navs && navs.map((item, index) => {
                return (
                  < li >
                    <a href={`/cat/${item.slug}`}>{item.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="right">
          {
            app.loginName ? <UserMenu>{app.loginName.split('@')[0]}</UserMenu> : <a href="/login">登录</a>
          }
        </div>
      </nav>
    </header >
  );
}
