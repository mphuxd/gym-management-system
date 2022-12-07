import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";

export const getServerSideProps = withPageAuthRequired();

async function getSession(sessionId) {
  const response = await fetch(`/api/member/getCheckoutSession/${sessionId}`);
  const data = await response.json();
  return data;
}

export default function SignUpSuccess() {
  let [sessionId, setSessionId] = useState("");
  let [checkoutSession, setCheckoutSession] = useState();

  console.log(checkoutSession);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setSessionId(query.get("session_id"));
    }
    if (sessionId) getSession(sessionId).then((data) => setCheckoutSession(data));
  }, [sessionId]);

  return (
    <section>
      <div className='product Box-root'>
        <div className='description Box-root'>
          <h3>
            Order details. Thank you for subscribing. Subscription to starter plan successful!
            Please click on the button below to complete your member profile.
          </h3>
        </div>
      </div>
      <form action='/create-portal-session' method='POST'>
        <input type='hidden' id='session-id' name='session_id' value={sessionId} />
        <button id='checkout-and-portal-button' type='submit'>
          Complete Member Profile
        </button>
      </form>
    </section>
  );
}

//Confirmation page & display information, then redirect to complete their profile.

// You want your "Thank you page" to rely only on checkout.Session. In your thank you page, you should tell the customer nothing more than "We confirm your order" and any data that's present in the checkout.Session object.
