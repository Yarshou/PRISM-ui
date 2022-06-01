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
                            <Route exact path="profile" element={<UserProfilePage />} />
                            <Route exact path="album" element={<Outlet />}>
                                <Route index element={<AlbumPage/>}/>
                                <Route path=":event_name" element={<AlbumDetailPage/>} />
                            </Route>
                            <Route exact path="uploader" element={<UploaderPage />} />
                            {/*<Route exact path="profile" element={<UserProfilePage/>}/>*/}
                            {/*<Route exact path="groups" element={<Outlet/>}>*/}
                            {/*    <Route index element={<GroupsPage/>}/>*/}
                            {/*    <Route path=":groupId/slices" element={<SlicesPage/>}/>*/}
                            {/*    <Route exact path="confirm-invitation/:token" element={<ConfirmInvitationPage/>}/>*/}
                            {/*</Route>*/}
                            {/*<Route path="slices" element={<GroupSelectPage/>}/>*/}
                            {/*<Route path="trainings" element={<Outlet/>}>*/}
                            {/*    <Route path=":id" element={<TrainingPage/>}/>*/}
                            {/*</Route>*/}
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </AppThemeProvider>,
    document.getElementById('root')
);
