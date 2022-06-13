import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

import {AuthProvider} from "./providers/auth.provider";
import {GuestRoute, MemberRoute} from "./utils/routing.utils";
import App from "./App";
import AuthPage from "./components/auth/auth.page";
import HomePage from "./components/home.page";
import DashboardPage from "./components/dashboard/dashboard.page";
import {AppThemeProvider} from "./providers/theme.provider";
import UserProfilePage from "./components/user-profile/user-profile.page";
import AlbumPage from "./components/album/album.page";
import UploaderPage from "./components/uploader/uploader.page";
import AlbumDetailPage from "./components/album/album-detail.page";
import PhotoPage from "./components/album/photo-detail.page";
import MainPage from "./components/menu/main.page";


ReactDOM.render(
    <AppThemeProvider>
        <AuthProvider>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route exact path="/auth" element={<GuestRoute/>}>
                        <Route index element={<AuthPage/>}/>
                    </Route>
                    <Route path="/me" element={<MemberRoute/>}>
                        <Route path="/me" element={<App/>}>
                            <Route index element={<DashboardPage/>}/>
                            <Route exact path="main" element={<MainPage/>}/>
                            <Route exact path="profile" element={<UserProfilePage />}>
                                <Route path=":user_id" element={<UserProfilePage/>}/>
                            </Route>
                            <Route exact path="album" element={<Outlet />}>
                                <Route index element={<AlbumPage/>}/>
                                <Route path=":event_name" element={<AlbumDetailPage/>}/>
                                <Route path="photo/:id" element={<PhotoPage/>}/>
                            </Route>
                            <Route exact path="uploader" element={<UploaderPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </AppThemeProvider>,
    document.getElementById('root')
);
