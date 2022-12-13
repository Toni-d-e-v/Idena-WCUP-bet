import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { sliceName as generalSliceName } from './core/reducer';
import { actionNames } from './core/constants';
import { getAuthLocalStorage, removeAuthLocalStorage, getExpiresCurrentUnixMilli } from './core/utilities';
import { appConfigurations } from './core/constants';
import MainAnimation from "./MainAnim";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.general.user);
  const tokensSecured = useSelector(state => state.general.tokensSecured);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idenaAuthToken = urlParams.get('token');
    const { tokens } = getAuthLocalStorage();
    if (tokens) {
      const { expiresUnixMilli, currentUnixMilli } = getExpiresCurrentUnixMilli(tokens.refresh.expires);
      if (expiresUnixMilli - 10000 > currentUnixMilli) {
        dispatch({ type: actionNames[generalSliceName].updateTokensSecured, payload: true });
        dispatch({ type: actionNames.refreshTokens });
        return;
      }
    }
    removeAuthLocalStorage();
    if (idenaAuthToken) {
      dispatch({ type: actionNames.processLogin, payload: idenaAuthToken });
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (tokensSecured) {
      const { user } = getAuthLocalStorage();
      dispatch({ type: actionNames[generalSliceName].updateUser, payload: user });
      intervalId = setInterval(() => {
        dispatch({ type: actionNames.refreshTokens });
      }, appConfigurations.refreshTokensMinutes * 60 * 1000);

      dispatch({ type: actionNames.getData });
    } else {
      dispatch({ type: actionNames[generalSliceName].updateUser, payload: null });
      intervalId && clearInterval(intervalId);

      dispatch({ type: actionNames[generalSliceName].clearData });
    }
    return () => intervalId && clearInterval(intervalId);
  }, [tokensSecured]);

  const idenaSignIn = () => {
    const token = uuidv4();
    const params = new URLSearchParams({
      token,
      callback_url: encodeURIComponent(`${appConfigurations.localBaseUrl}?token=${token}`),
      nonce_endpoint: `${appConfigurations.apiBaseUrl}/auth/start-session`,
      authentication_endpoint: `${appConfigurations.apiBaseUrl}/auth/authenticate`,
      favicon_url: `${appConfigurations.localBaseUrl}/favicon.ico`
    });

    window.location.href = `${appConfigurations.idenaSignInUrl}?` + params.toString();
  };

  const signOut = () => {
    dispatch({ type: actionNames.processlogout });
  };

  
  // craete me and states
  // oracleAdress
  // Smart contract: team1_wins, team2_wins
  // And team1, team2

  let team1 = "France";
  let team2 = "Croatia";
  // let oracleAddress = "0x0000000000000000000000000000000000000000";
  // let team1_wins = 0;
  // let team2_wins = 0;
  // make it global
  return (
    <div className="App" >

    <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="flex items-center p-2 gap-2">
            <img src="./images/logo_wcup-inverted.png" alt="logo" className="w-12 h-12" />
            <div className="font-bold text-2xl">
              WCUP: <span className="text-sky-900">iDNA bet</span>
            </div>
          </div>
          <div className="block md:hidden ml-auto pr-4 my-auto cursor-pointer">
            <div id="mobile-menu-button" className="group peer">
              <div className="top-0 bg-zinc-200 rounded-full w-8 h-1 group-open:rotate-45 group-open:top-2 relative transition-all"></div>
              <div className="transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0"></div>
              <div className="top-0 group-open:-rotate-45 transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 group-open:-top-2 relative"></div>
            </div>
            <div className="absolute top-[62px] left-0 hidden w-full bg-gradient-to-r from-rose-500 to-pink-500 peer-open:block">
              <div className="relative flex h-full cursor-pointer items-center justify-center p-4 font-bold text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">

              </div>
              <div id="ticket-menu-item" className="group relative h-full cursor-pointer text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <div className="p-4 text-center font-bold">Support</div>
                <div className="hidden group-open:block">
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span>Telegram</span>
                  </div>
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span>Discord</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex hidden flex-1 items-center justify-end">
          {user && (
                  <img  src={`https://robohash.org/${user.address}?set=set1`} 
                  style={{width: '30px', height: '30px', borderRadius: '50%'}}
                  />
            )}
            <div className="menu-item">
            {tokensSecured ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => idenaSignIn()}>Sign in with Idena</button>}
            </div>
           
          </div>
        </nav>
      <div className="Container">
 
      <MainAnimation />

      <div style= {{
  
      }}
      className="bg-cover bg-center bg-fixed flex flex-col items-center justify-center h-[calc(100vh-200px)] min-h-[400px]">
        
          <div className="bg-white/30 py-2 px-4 rounded-xl text-center backdrop-blur-md">

            <div className="relative">
              <img src="./images/logo.png" width="175" />
              <div className="flex item-center justify-center mt-[-70px] mb-5">
                <div className="bg-pink-500 w-14 h-14 rounded-full flex items-center justify-center gap-1">
                  <div className="h-2 w-1 bg-pink-300 rounded-full animate-wavey"></div>
                  <div className="h-3 w-1 bg-pink-200 rounded-full animate-wavey animation-delay-200"></div>
                  <div className="h-4 w-1 bg-pink-100 rounded-full animate-wavey animation-delay-[150ms]"></div>
                  <div className="h-3 w-1 bg-pink-200 rounded-full animate-wavey animation-delay-300"></div>
                  <div className="h-2 w-1 bg-pink-300 rounded-full animate-wavey animation-delay-[75ms]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-5xl font-bold">
          <span className="text-zinc-200">i</span>
          <span className="text-sky-900">DNA</span>
          <span className="text-zinc-200">bet</span>
          </div>
          <div className="font-bold mt-3 text-base backdrop-blur-md
            white-text
          ">
      Bets will be available after December 14th 9pm GMT.
          </div>
          <div className="mt-3">
          <div className="white-text2  bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> { team1 } Wins</h3>
            </div>
            <div className="mt-3 flex gap-2">
              <input type="number" placeholder='iDNA' className="rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
              {
                user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Place Bet
                </div>
                )
              }
              {
                !user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Sign in to place bet
                  </div>
                )
              }
          </div>
          <p className="text-center mt-3 text-sm font-bold">
          </p>
          <div className="white-text2  bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> { team2 } Wins</h3>
            </div>
            <div className="mt-3 flex gap-2">
              <input type="number" placeholder='iDNA' className="rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
              {
                user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Place Bet
                </div>
                )
              }
              {
                !user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Sign in to place bet
                  </div>
                )
              }
          </div>
        </div>
      </div>
      <MainAnimation />

      <div style= {{
}}
      className="bg-cover bg-center bg-fixed flex flex-col items-center justify-center h-[calc(100vh-200px)] min-h-[400px]">
      </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
