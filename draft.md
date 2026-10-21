First Inspect my codebase. Review file and folder structure and map the reusable component.

Now create a `components/ui/auth/signup.tsx` section and import it into public layout

Rules:
    - Must need responsive
    - If same data/desinge again again try to make it dynamic with dummy data.

My figma to code is:
```tsx
<div className="w-[1280px] h-[864px] p-5 bg-slate-50 inline-flex justify-center items-center">
  <div className="flex-1 max-w-[1280px] p-8 inline-flex flex-col justify-start items-start">
    <div className="self-stretch min-h-[760px] bg-white rounded-2xl shadow-2xl inline-flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch p-8 relative bg-linear-31 from-indigo-950 via-indigo-900 to-indigo-700 inline-flex flex-col justify-start items-start gap-20 overflow-hidden">
        <div className="size-96 left-[-128px] top-[-128px] absolute bg-violet-700/30 rounded-full blur-[32px]" />
        <div className="size-80 left-[364px] top-[412px] absolute bg-indigo-600/40 rounded-full blur-[32px]" />
        <div className="w-[588px] h-[762px] left-0 top-0 absolute opacity-20 bg-radial from-indigo-400 from 6% to-indigo-400/0 to 6%" />
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="size- flex justify-start items-center gap-2">
              <div className="size-9 bg-white/10 rounded-xl shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px] flex justify-center items-center">
                <div data-svg-wrapper>
                  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667V13.3333M1.66667 11.6667H15V11.6667V11.6667V3.33333H1.66667V11.6667V11.6667V11.6667V11.6667M4.58333 10.8333L3.41667 9.66667L5.5625 7.5L3.39583 5.33333L4.58333 4.16667L7.91667 7.5L4.58333 10.8333V10.8333M8.33333 10.8333V9.16667H13.3333V10.8333H8.33333V10.8333" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className="size- inline-flex flex-col justify-start items-start">
                <div className="justify-center text-white text-lg font-semibold font-['Geist'] leading-6">SubmitFlow</div>
              </div>
            </div>
            <div className="size- px-3 py-1 bg-white/10 rounded-full backdrop-blur-[6px] flex justify-start items-center gap-1.5">
              <div data-svg-wrapper>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="6" height="6" rx="3" fill="#34D399"/>
                </svg>
              </div>
              <div className="justify-center text-white/90 text-xs font-normal font-['Geist'] uppercase leading-5 tracking-wide">COHORT V4.8 ADMISSIONS OPEN</div>
            </div>
          </div>
          <div className="self-stretch pt-5 flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center"><span class="text-white text-4xl font-bold font-['Geist'] leading-10">Start building.<br/></span><span class="text-indigo-100 text-4xl font-bold font-['Geist'] leading-10">Start submitting.</span></div>
              </div>
              <div className="w-[512px] max-w-[512px] flex flex-col justify-start items-start">
                <div className="justify-center text-white/80 text-sm font-normal font-['Inter'] leading-6">Streamline your milestones, receive granular inline mentor reviews, automated<br/>CI test validations, and accelerate your engineering growth in one unified<br/>student hub.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch py-5 flex flex-col justify-start items-start">
          <div className="self-stretch p-5 relative bg-white/10 rounded-xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] shadow-xl shadow-[0px_0px_0px_1px_rgba(255,255,255,0.15)] backdrop-blur-md flex flex-col justify-start items-start overflow-hidden">
            <div className="self-stretch pb-2 border-b border-white/10 inline-flex justify-between items-center">
              <div className="size- flex justify-start items-center gap-2">
                <div className="size- flex justify-start items-start">
                  <div data-svg-wrapper>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" rx="5" fill="#F87171" fill-opacity="0.8"/>
                    </svg>
                  </div>
                  <div data-svg-wrapper>
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" width="10" height="10" rx="5" fill="#FBBF24" fill-opacity="0.8"/>
                    </svg>
                  </div>
                  <div data-svg-wrapper>
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" width="10" height="10" rx="5" fill="#34D399" fill-opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                <div className="size- pl-2 inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-white/60 text-xs font-normal font-['Geist'] leading-4">student-env ~/sprint-04</div>
                </div>
              </div>
              <div className="size- px-2.5 py-0.5 bg-emerald-500/20 rounded-full flex justify-start items-center gap-1">
                <div data-svg-wrapper>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="6" height="6" rx="3" fill="#34D399"/>
                  </svg>
                </div>
                <div className="justify-center text-emerald-300 text-xs font-semibold font-['Geist'] leading-4 tracking-tight">Ready to Ship</div>
              </div>
            </div>
            <div className="self-stretch py-3 flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch inline-flex justify-start items-center gap-[0px]">
                <div className="size- pr-2 inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-indigo-300 text-xs font-normal font-['Geist'] leading-4">$</div>
                </div>
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-white/90 text-xs font-normal font-['Geist'] leading-4">git push submitflow main</div>
                </div>
              </div>
              <div className="self-stretch pl-3 pt-1 border-l border-white/10 flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div data-svg-wrapper>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.73333 9.73346L10.4333 5.03346L9.5 4.10012L5.73333 7.86679L3.83333 5.96679L2.9 6.90012L5.73333 9.73346V9.73346M6.66667 13.3335C5.74444 13.3335 4.87778 13.1585 4.06667 12.8085C3.25556 12.4585 2.55 11.9835 1.95 11.3835C1.35 10.7835 0.875 10.0779 0.525 9.26679C0.175 8.45568 0 7.58901 0 6.66679C0 5.74457 0.175 4.8779 0.525 4.06679C0.875 3.25568 1.35 2.55012 1.95 1.95012C2.55 1.35012 3.25556 0.875122 4.06667 0.525122C4.87778 0.175122 5.74444 0.00012207 6.66667 0.00012207C7.58889 0.00012207 8.45555 0.175122 9.26667 0.525122C10.0778 0.875122 10.7833 1.35012 11.3833 1.95012C11.9833 2.55012 12.4583 3.25568 12.8083 4.06679C13.1583 4.8779 13.3333 5.74457 13.3333 6.66679C13.3333 7.58901 13.1583 8.45568 12.8083 9.26679C12.4583 10.0779 11.9833 10.7835 11.3833 11.3835C10.7833 11.9835 10.0778 12.4585 9.26667 12.8085C8.45555 13.1585 7.58889 13.3335 6.66667 13.3335V13.3335M6.66667 12.0001C8.15556 12.0001 9.41667 11.4835 10.45 10.4501C11.4833 9.41679 12 8.15568 12 6.66679C12 5.1779 11.4833 3.91679 10.45 2.88346C9.41667 1.85012 8.15556 1.33346 6.66667 1.33346C5.17778 1.33346 3.91667 1.85012 2.88333 2.88346C1.85 3.91679 1.33333 5.1779 1.33333 6.66679C1.33333 8.15568 1.85 9.41679 2.88333 10.4501C3.91667 11.4835 5.17778 12.0001 6.66667 12.0001V12.0001M6.66667 6.66679V6.66679V6.66679V6.66679V6.66679V6.66679V6.66679V6.66679V6.66679V6.66679" fill="#6EE7B7"/>
                    </svg>
                  </div>
                  <div className="size- inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-emerald-300 text-xs font-normal font-['Geist'] leading-4">38 Automated CI Tests Passed</div>
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div data-svg-wrapper>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.06667 14L3.8 11.8667L1.4 11.3333L1.63333 8.86667L0 7L1.63333 5.13333L1.4 2.66667L3.8 2.13333L5.06667 0L7.33333 0.966667L9.6 0L10.8667 2.13333L13.2667 2.66667L13.0333 5.13333L14.6667 7L13.0333 8.86667L13.2667 11.3333L10.8667 11.8667L9.6 14L7.33333 13.0333L5.06667 14V14M5.63333 12.3L7.33333 11.5667L9.06667 12.3L10 10.7L11.8333 10.2667L11.6667 8.4L12.9 7L11.6667 5.56667L11.8333 3.7L10 3.3L9.03333 1.7L7.33333 2.43333L5.6 1.7L4.66667 3.3L2.83333 3.7L3 5.56667L1.76667 7L3 8.4L2.83333 10.3L4.66667 10.7L5.63333 12.3V12.3M7.33333 7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7V7M6.63333 9.36667L10.4 5.6L9.46667 4.63333L6.63333 7.46667L5.2 6.06667L4.26667 7L6.63333 9.36667V9.36667" fill="#6EE7B7"/>
                    </svg>
                  </div>
                  <div className="size- inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-emerald-300 text-xs font-normal font-['Geist'] leading-4">Lint &amp; Static Analysis: 100%</div>
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div data-svg-wrapper>
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0333 5.33333L8.66667 2.96667L9.61667 2.03333L11.0333 3.45L13.8667 0.616667L14.8 1.56667L11.0333 5.33333V5.33333M5.33333 5.33333C4.6 5.33333 3.97222 5.07222 3.45 4.55C2.92778 4.02778 2.66667 3.4 2.66667 2.66667C2.66667 1.93333 2.92778 1.30556 3.45 0.783333C3.97222 0.261111 4.6 0 5.33333 0C6.06667 0 6.69444 0.261111 7.21667 0.783333C7.73889 1.30556 8 1.93333 8 2.66667C8 3.4 7.73889 4.02778 7.21667 4.55C6.69444 5.07222 6.06667 5.33333 5.33333 5.33333V5.33333M0 10.6667V8.8C0 8.42222 0.0972222 8.075 0.291667 7.75833C0.486111 7.44167 0.744444 7.2 1.06667 7.03333C1.75556 6.68889 2.45556 6.43056 3.16667 6.25833C3.87778 6.08611 4.6 6 5.33333 6C6.06667 6 6.78889 6.08611 7.5 6.25833C8.21111 6.43056 8.91111 6.68889 9.6 7.03333C9.92222 7.2 10.1806 7.44167 10.375 7.75833C10.5694 8.075 10.6667 8.42222 10.6667 8.8V10.6667H0V10.6667M1.33333 9.33333H9.33333V8.8C9.33333 8.67778 9.30278 8.56667 9.24167 8.46667C9.18056 8.36667 9.1 8.28889 9 8.23333C8.4 7.93333 7.79444 7.70833 7.18333 7.55833C6.57222 7.40833 5.95556 7.33333 5.33333 7.33333C4.71111 7.33333 4.09444 7.40833 3.48333 7.55833C2.87222 7.70833 2.26667 7.93333 1.66667 8.23333C1.56667 8.28889 1.48611 8.36667 1.425 8.46667C1.36389 8.56667 1.33333 8.67778 1.33333 8.8V9.33333V9.33333M5.33333 4C5.7 4 6.01389 3.86944 6.275 3.60833C6.53611 3.34722 6.66667 3.03333 6.66667 2.66667C6.66667 2.3 6.53611 1.98611 6.275 1.725C6.01389 1.46389 5.7 1.33333 5.33333 1.33333C4.96667 1.33333 4.65278 1.46389 4.39167 1.725C4.13056 1.98611 4 2.3 4 2.66667C4 3.03333 4.13056 3.34722 4.39167 3.60833C4.65278 3.86944 4.96667 4 5.33333 4V4M5.33333 8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333V8.33333M5.33333 2.66667V2.66667V2.66667V2.66667V2.66667V2.66667V2.66667V2.66667V2.66667V2.66667" fill="#BAE6FD"/>
                    </svg>
                  </div>
                  <div className="size- inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-sky-200 text-xs font-normal font-['Geist'] leading-4">Mentor Assigned: Sarah Lin (Staff Eng)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch pt-2 border-t border-white/10 flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-white/70 text-xs font-normal font-['Geist'] leading-4">Milestone 04 Progress</div>
                </div>
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-white text-xs font-semibold font-['Geist'] leading-4">80% to Capstone Review</div>
                </div>
              </div>
              <div className="self-stretch h-1.5 relative bg-white/20 rounded-full overflow-hidden">
                <div className="w-96 h-1.5 left-0 top-0 absolute bg-gradient-to-r from-emerald-400 to-indigo-100 rounded-full" />
              </div>
            </div>
            <div className="size-36 left-[380px] top-0 absolute bg-purple-300/10 rounded-full blur-[20px]" />
          </div>
        </div>
      </div>
      <div className="self-stretch px-16 py-12 bg-white inline-flex flex-col justify-center items-start">
        <div className="w-full max-w-96 flex flex-col justify-start items-start gap-5">
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="size- px-3 py-1 bg-blue-50 rounded-full inline-flex justify-start items-center gap-2">
              <div data-svg-wrapper>
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.875 11.25L2.5 8.875V5.125L0 3.75L6.875 0L13.75 3.75V8.75H12.5V4.4375L11.25 5.125V8.875L6.875 11.25V11.25M6.875 6.0625L11.1562 3.75L6.875 1.4375L2.59375 3.75L6.875 6.0625V6.0625M6.875 9.82812L10 8.14062V5.78125L6.875 7.5L3.75 5.78125V8.14062L6.875 9.82812V9.82812M6.875 6.0625V6.0625V6.0625V6.0625V6.0625V6.0625M6.875 7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875M6.875 7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875V7.46875" fill="#3525CD"/>
                </svg>
              </div>
              <div className="size- inline-flex flex-col justify-start items-start">
                <div className="justify-center text-indigo-700 text-xs font-semibold font-['Geist'] leading-4 tracking-tight">Student Registration • Free Access for Cohort Learners</div>
              </div>
            </div>
            <div className="self-stretch pt-1 flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-slate-900 text-2xl font-bold font-['Geist'] leading-8">Create your account</div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-700 text-sm font-normal font-['Inter'] leading-5">Join SubmitFlow as a student and start submitting your project<br/>milestones.</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center"><span class="text-slate-900 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">FULL NAME </span><span class="text-red-700 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">*</span></div>
                </div>
                <div className="size- opacity-90 flex justify-start items-center gap-1">
                  <div data-svg-wrapper>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.65833 7.90833L8.47708 4.08958L7.71875 3.33125L4.65833 6.39167L3.11458 4.84792L2.35625 5.60625L4.65833 7.90833V7.90833M5.41667 10.8333C4.66736 10.8333 3.96319 10.6911 3.30417 10.4068C2.64514 10.1224 2.07188 9.73646 1.58438 9.24896C1.09687 8.76146 0.710938 8.18819 0.426562 7.52917C0.142187 6.87014 0 6.16597 0 5.41667C0 4.66736 0.142187 3.96319 0.426562 3.30417C0.710938 2.64514 1.09687 2.07188 1.58438 1.58438C2.07188 1.09687 2.64514 0.710938 3.30417 0.426562C3.96319 0.142187 4.66736 0 5.41667 0C6.16597 0 6.87014 0.142187 7.52917 0.426562C8.18819 0.710938 8.76146 1.09687 9.24896 1.58438C9.73646 2.07188 10.1224 2.64514 10.4068 3.30417C10.6911 3.96319 10.8333 4.66736 10.8333 5.41667C10.8333 6.16597 10.6911 6.87014 10.4068 7.52917C10.1224 8.18819 9.73646 8.76146 9.24896 9.24896C8.76146 9.73646 8.18819 10.1224 7.52917 10.4068C6.87014 10.6911 6.16597 10.8333 5.41667 10.8333V10.8333M5.41667 9.75C6.62639 9.75 7.65104 9.33021 8.49063 8.49063C9.33021 7.65104 9.75 6.62639 9.75 5.41667C9.75 4.20694 9.33021 3.18229 8.49063 2.34271C7.65104 1.50312 6.62639 1.08333 5.41667 1.08333C4.20694 1.08333 3.18229 1.50312 2.34271 2.34271C1.50312 3.18229 1.08333 4.20694 1.08333 5.41667C1.08333 6.62639 1.50312 7.65104 2.34271 8.49063C3.18229 9.33021 4.20694 9.75 5.41667 9.75V9.75M5.41667 5.41667V5.41667V5.41667V5.41667V5.41667V5.41667V5.41667V5.41667V5.41667V5.41667" fill="#059669"/>
                    </svg>
                  </div>
                  <div className="justify-center text-emerald-600 text-xs font-semibold font-['Geist'] leading-4 tracking-tight">Min 2 chars</div>
                </div>
              </div>
              <div className="self-stretch relative inline-flex justify-start items-center">
                <div className="flex-1 h-11 pl-10 pr-3 py-3.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shadow-[0px_0px_0px_1px_rgba(199,196,216,1.00)] inline-flex flex-col justify-start items-start overflow-hidden">
                  <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                    <div className="self-stretch justify-center text-slate-900 text-sm font-normal font-['Inter']">Maya Chen</div>
                  </div>
                </div>
                <div data-svg-wrapper className="left-[15px] top-[16px] absolute">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6C5.175 6 4.46875 5.70625 3.88125 5.11875C3.29375 4.53125 3 3.825 3 3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3C9 3.825 8.70625 4.53125 8.11875 5.11875C7.53125 5.70625 6.825 6 6 6V6M0 12V9.9C0 9.475 0.109375 9.08437 0.328125 8.72812C0.546875 8.37187 0.8375 8.1 1.2 7.9125C1.975 7.525 2.7625 7.23438 3.5625 7.04063C4.3625 6.84688 5.175 6.75 6 6.75C6.825 6.75 7.6375 6.84688 8.4375 7.04063C9.2375 7.23438 10.025 7.525 10.8 7.9125C11.1625 8.1 11.4531 8.37187 11.6719 8.72812C11.8906 9.08437 12 9.475 12 9.9V12H0V12M1.5 10.5H10.5V9.9C10.5 9.7625 10.4656 9.6375 10.3969 9.525C10.3281 9.4125 10.2375 9.325 10.125 9.2625C9.45 8.925 8.76875 8.67188 8.08125 8.50313C7.39375 8.33438 6.7 8.25 6 8.25C5.3 8.25 4.60625 8.33438 3.91875 8.50313C3.23125 8.67188 2.55 8.925 1.875 9.2625C1.7625 9.325 1.67188 9.4125 1.60312 9.525C1.53437 9.6375 1.5 9.7625 1.5 9.9V10.5V10.5M6 4.5C6.4125 4.5 6.76562 4.35312 7.05937 4.05937C7.35312 3.76562 7.5 3.4125 7.5 3C7.5 2.5875 7.35312 2.23438 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23438 4.5 2.5875 4.5 3C4.5 3.4125 4.64688 3.76562 4.94063 4.05937C5.23438 4.35312 5.5875 4.5 6 4.5V4.5M6 3V3V3V3V3V3V3V3V3V3M6 10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5" fill="#777587"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center"><span class="text-slate-900 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">STUDENT EMAIL ADDRESS </span><span class="text-red-700 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">*</span></div>
              </div>
              <div className="self-stretch relative inline-flex justify-start items-center">
                <div className="flex-1 h-11 pl-10 pr-3 py-3.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shadow-[0px_0px_0px_1px_rgba(199,196,216,1.00)] inline-flex flex-col justify-start items-start overflow-hidden">
                  <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                    <div className="self-stretch justify-center text-gray-400 text-sm font-normal font-['Inter']">maya@university.edu or your personal email</div>
                  </div>
                </div>
                <div data-svg-wrapper className="left-[13.50px] top-[16px] absolute">
                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H1.5V12M7.5 6.75L1.5 3V10.5V10.5V10.5H13.5V10.5V10.5V3L7.5 6.75V6.75M7.5 5.25L13.5 1.5H1.5L7.5 5.25V5.25M1.5 3V1.5V1.5V3V10.5V10.5V10.5V10.5V10.5V10.5V3V3" fill="#777587"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center"><span class="text-slate-900 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">PASSWORD </span><span class="text-red-700 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">*</span></div>
              </div>
              <div className="self-stretch relative inline-flex justify-start items-center">
                <div className="flex-1 h-11 px-10 py-3.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shadow-[0px_0px_0px_1px_rgba(199,196,216,1.00)] inline-flex flex-col justify-start items-start overflow-hidden">
                  <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                    <div className="self-stretch justify-center text-slate-900 text-sm font-normal font-['Inter']">DevSprintSecure2024!</div>
                  </div>
                </div>
                <div data-svg-wrapper className="left-[15px] top-[13.75px] absolute">
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 15.75C1.0875 15.75 0.734375 15.6031 0.440625 15.3094C0.146875 15.0156 0 14.6625 0 14.25V6.75C0 6.3375 0.146875 5.98438 0.440625 5.69063C0.734375 5.39688 1.0875 5.25 1.5 5.25H2.25V3.75C2.25 2.7125 2.61562 1.82812 3.34687 1.09687C4.07812 0.365625 4.9625 0 6 0C7.0375 0 7.92188 0.365625 8.65312 1.09687C9.38437 1.82812 9.75 2.7125 9.75 3.75V5.25H10.5C10.9125 5.25 11.2656 5.39688 11.5594 5.69063C11.8531 5.98438 12 6.3375 12 6.75V14.25C12 14.6625 11.8531 15.0156 11.5594 15.3094C11.2656 15.6031 10.9125 15.75 10.5 15.75H1.5V15.75M1.5 14.25H10.5V14.25V14.25V6.75V6.75V6.75H1.5V6.75V6.75V14.25V14.25V14.25V14.25M6 12C6.4125 12 6.76562 11.8531 7.05937 11.5594C7.35312 11.2656 7.5 10.9125 7.5 10.5C7.5 10.0875 7.35312 9.73438 7.05937 9.44063C6.76562 9.14688 6.4125 9 6 9C5.5875 9 5.23438 9.14688 4.94063 9.44063C4.64688 9.73438 4.5 10.0875 4.5 10.5C4.5 10.9125 4.64688 11.2656 4.94063 11.5594C5.23438 11.8531 5.5875 12 6 12V12M3.75 5.25H8.25V3.75C8.25 3.125 8.03125 2.59375 7.59375 2.15625C7.15625 1.71875 6.625 1.5 6 1.5C5.375 1.5 4.84375 1.71875 4.40625 2.15625C3.96875 2.59375 3.75 3.125 3.75 3.75V5.25V5.25M1.5 14.25V14.25V14.25V6.75V6.75V6.75V6.75V6.75V6.75V14.25V14.25V14.25V14.25V14.25" fill="#777587"/>
                  </svg>
                </div>
                <div className="size- pb-[5px] left-[419.50px] top-[10.50px] absolute inline-flex flex-col justify-center items-center">
                  <div data-svg-wrapper>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9V9M8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65V7.65M8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25V11.25M8.25 5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625M8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75V9.75" fill="#777587"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="self-stretch pt-1.5 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch inline-flex justify-center items-start gap-1.5">
                  <div className="flex-1 h-1.5 bg-emerald-500 rounded-full" />
                  <div className="flex-1 h-1.5 bg-emerald-500 rounded-full" />
                  <div className="flex-1 h-1.5 bg-emerald-500 rounded-full" />
                  <div className="flex-1 h-1.5 bg-indigo-600 rounded-full" />
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="size- inline-flex flex-col justify-start items-start">
                    <div className="justify-center"><span class="text-gray-700 text-xs font-normal font-['Geist'] leading-5">Strength: </span><span class="text-emerald-600 text-xs font-normal font-['Geist'] leading-5">Strong</span></div>
                  </div>
                  <div className="size- inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-gray-700 text-xs font-normal font-['Geist'] leading-5">Letters, Numbers &amp; Symbols verified</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center"><span class="text-slate-900 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">CONFIRM PASSWORD </span><span class="text-red-700 text-xs font-semibold font-['Geist'] uppercase leading-4 tracking-wide">*</span></div>
                </div>
                <div className="size- flex justify-start items-center gap-1">
                  <div data-svg-wrapper>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.01667 8.51667L9.12917 4.40417L8.3125 3.5875L5.01667 6.88333L3.35417 5.22083L2.5375 6.0375L5.01667 8.51667V8.51667M5.83333 11.6667C5.02639 11.6667 4.26806 11.5135 3.55833 11.2073C2.84861 10.901 2.23125 10.4854 1.70625 9.96042C1.18125 9.43542 0.765625 8.81806 0.459375 8.10833C0.153125 7.39861 0 6.64028 0 5.83333C0 5.02639 0.153125 4.26806 0.459375 3.55833C0.765625 2.84861 1.18125 2.23125 1.70625 1.70625C2.23125 1.18125 2.84861 0.765625 3.55833 0.459375C4.26806 0.153125 5.02639 0 5.83333 0C6.64028 0 7.39861 0.153125 8.10833 0.459375C8.81806 0.765625 9.43542 1.18125 9.96042 1.70625C10.4854 2.23125 10.901 2.84861 11.2073 3.55833C11.5135 4.26806 11.6667 5.02639 11.6667 5.83333C11.6667 6.64028 11.5135 7.39861 11.2073 8.10833C10.901 8.81806 10.4854 9.43542 9.96042 9.96042C9.43542 10.4854 8.81806 10.901 8.10833 11.2073C7.39861 11.5135 6.64028 11.6667 5.83333 11.6667V11.6667M5.83333 10.5C7.13611 10.5 8.23958 10.0479 9.14375 9.14375C10.0479 8.23958 10.5 7.13611 10.5 5.83333C10.5 4.53056 10.0479 3.42708 9.14375 2.52292C8.23958 1.61875 7.13611 1.16667 5.83333 1.16667C4.53056 1.16667 3.42708 1.61875 2.52292 2.52292C1.61875 3.42708 1.16667 4.53056 1.16667 5.83333C1.16667 7.13611 1.61875 8.23958 2.52292 9.14375C3.42708 10.0479 4.53056 10.5 5.83333 10.5V10.5M5.83333 5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333" fill="#059669"/>
                    </svg>
                  </div>
                  <div className="justify-center text-emerald-600 text-xs font-semibold font-['Geist'] leading-4 tracking-tight">Passwords match</div>
                </div>
              </div>
              <div className="self-stretch relative inline-flex justify-start items-center">
                <div className="flex-1 h-11 px-10 py-3.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shadow-[0px_0px_0px_1px_rgba(199,196,216,1.00)] inline-flex flex-col justify-start items-start overflow-hidden">
                  <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                    <div className="self-stretch justify-center text-slate-900 text-sm font-normal font-['Inter']">DevSprintSecure2024!</div>
                  </div>
                </div>
                <div data-svg-wrapper className="left-[13.50px] top-[14.50px] absolute">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094C3.6625 14.0156 2.86875 13.4812 2.19375 12.8062C1.51875 12.1312 0.984375 11.3375 0.590625 10.425C0.196875 9.5125 0 8.5375 0 7.5H1.5C1.5 8.325 1.65625 9.10313 1.96875 9.83438C2.28125 10.5656 2.70937 11.2031 3.25312 11.7469C3.79688 12.2906 4.43438 12.7219 5.16563 13.0406C5.89687 13.3594 6.675 13.5188 7.5 13.5188C9.175 13.5188 10.5938 12.9375 11.7563 11.775C12.9188 10.6125 13.5 9.19375 13.5 7.51875C13.5 5.84375 12.9188 4.425 11.7563 3.2625C10.5938 2.1 9.175 1.51875 7.5 1.51875C6.3875 1.51875 5.37813 1.79062 4.47188 2.33437C3.56563 2.87812 2.85 3.6 2.325 4.5H4.5V6H0V1.5H1.5V3C2.1875 2.0875 3.05 1.35938 4.0875 0.815625C5.125 0.271875 6.2625 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.5375 14.8031 9.5125 14.4094 10.425C14.0156 11.3375 13.4812 12.1312 12.8062 12.8062C12.1312 13.4812 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15V15M6 10.5C5.7875 10.5 5.60938 10.4281 5.46562 10.2844C5.32187 10.1406 5.25 9.9625 5.25 9.75V7.5C5.25 7.2875 5.32187 7.10938 5.46562 6.96562C5.60938 6.82187 5.7875 6.75 6 6.75V6C6 5.5875 6.14688 5.23438 6.44063 4.94063C6.73438 4.64688 7.0875 4.5 7.5 4.5C7.9125 4.5 8.26562 4.64688 8.55937 4.94063C8.85312 5.23438 9 5.5875 9 6V6.75C9.2125 6.75 9.39062 6.82187 9.53438 6.96562C9.67813 7.10938 9.75 7.2875 9.75 7.5V9.75C9.75 9.9625 9.67813 10.1406 9.53438 10.2844C9.39062 10.4281 9.2125 10.5 9 10.5H6V10.5M6.75 6.75H8.25V6C8.25 5.7875 8.17813 5.60938 8.03438 5.46562C7.89062 5.32187 7.7125 5.25 7.5 5.25C7.2875 5.25 7.10938 5.32187 6.96562 5.46562C6.82187 5.60938 6.75 5.7875 6.75 6V6.75V6.75" fill="#777587"/>
                  </svg>
                </div>
                <div className="size- pb-[5px] left-[419.50px] top-[10.50px] absolute inline-flex flex-col justify-center items-center">
                  <div data-svg-wrapper>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9V9M8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65V7.65M8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25V11.25M8.25 5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625V5.625M8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75V9.75" fill="#777587"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch pt-1 inline-flex justify-start items-start gap-2">
              <div data-svg-wrapper>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="2" width="16" height="16" rx="2.5" fill="#3525CD"/>
                </svg>
              </div>
              <div className="w-96 h-9 relative">
                <div className="left-0 top-[-1.06px] absolute justify-center"><span class="text-gray-700 text-xs font-normal font-['Inter'] leading-4">I agree to the </span><span class="text-indigo-700 text-xs font-normal font-['Inter'] leading-4">SubmitFlow Student Code of Conduct</span><span class="text-gray-700 text-xs font-normal font-['Inter'] leading-4"> and </span><span class="text-indigo-700 text-xs font-normal font-['Inter'] leading-4">Academic</span><span class="text-gray-700 text-xs font-normal font-['Inter'] leading-4"><br/></span><span class="text-indigo-700 text-xs font-normal font-['Inter'] leading-4">Integrity Guidelines</span><span class="text-gray-700 text-xs font-normal font-['Inter'] leading-4">.</span></div>
              </div>
            </div>
            <div className="self-stretch px-3 pt-4 pb-3.5 relative bg-indigo-700 rounded-xl inline-flex justify-center items-center gap-2">
              <div className="w-96 h-12 left-0 top-[4px] absolute bg-white/0 rounded-xl shadow-[0px_4px_6px_-4px_rgba(99,102,241,0.20)] shadow-[0px_10px_15px_-3px_rgba(99,102,241,0.20)]" />
              <div className="size- inline-flex flex-col justify-start items-center">
                <div className="text-center justify-center text-white text-sm font-medium font-['Geist'] leading-5">Create Student Account</div>
              </div>
              <div data-svg-wrapper>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75V6.75" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-3">
              <div className="self-stretch inline-flex justify-center items-center gap-1.5">
                <div data-svg-wrapper>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.05417 7.90417L7.35 4.60833L6.51875 3.77708L4.05417 6.24167L2.82917 5.01667L1.99792 5.84792L4.05417 7.90417V7.90417M4.66667 11.6667C3.31528 11.3264 2.19965 10.551 1.31979 9.34062C0.439931 8.13021 0 6.78611 0 5.30833V1.75L4.66667 0L9.33333 1.75V5.30833C9.33333 6.78611 8.8934 8.13021 8.01354 9.34062C7.13368 10.551 6.01806 11.3264 4.66667 11.6667V11.6667M4.66667 10.4417C5.67778 10.1208 6.51389 9.47917 7.175 8.51667C7.83611 7.55417 8.16667 6.48472 8.16667 5.30833V2.55208L4.66667 1.23958L1.16667 2.55208V5.30833C1.16667 6.48472 1.49722 7.55417 2.15833 8.51667C2.81944 9.47917 3.65556 10.1208 4.66667 10.4417V10.4417M4.66667 5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333V5.83333" fill="#059669"/>
                  </svg>
                </div>
                <div className="size- inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-gray-700 text-xs font-normal font-['Geist'] leading-5">Protected by 256-bit SSL encryption &amp; SOC2 certified data privacy</div>
                </div>
              </div>
              <div className="self-stretch pt-1 border-t border-sky-100 flex flex-col justify-start items-start">
                <div className="self-stretch inline-flex justify-center items-start gap-1">
                  <div className="text-center justify-center text-gray-700 text-xs font-normal font-['Inter'] leading-4">Already have an account? </div>
                  <div className="text-center justify-center text-indigo-700 text-xs font-semibold font-['Inter'] leading-4">Sign in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
Make sure when i click `Get Start` into navbar then i will redirect into this page.