import React, { ChangeEvent, FC, useState, useEffect, FormEvent } from 'react';
import ReactGA from 'react-ga4';
import axios from 'axios';
import qs from 'qs';

interface EmailFormFields {
  FNAME: string;
  LNAME: string;
  EMAIL: string;
  MESSAGE: string;
  CSRF: string;
}

interface StatusState {
  error: string;
  message: string;
}

const Contact: FC = () => {
  const [status, setStatus] = useState<StatusState>({ error: '', message: '' });
  const [fields, setFields] = useState<EmailFormFields>({
    FNAME: '',
    LNAME: '',
    EMAIL: '',
    MESSAGE: '',
    CSRF: ''
  });

  const handleFieldChange = (fieldName: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setFields(prevFields => ({
      ...prevFields,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sendmail.php', qs.stringify(fields));
      setStatus(response.data);
      if (!response.data.error) {
        setFields({
          FNAME: '',
          LNAME: '',
          EMAIL: '',
          MESSAGE: '',
          CSRF: fields.CSRF
        });
        ReactGA.event({
          category: 'contact',
          action: 'Contact Form Widget',
          label: 'Contact Form'
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get('/api/csrftoken.php');
        setFields(prevState => ({
          ...prevState,
          CSRF: response.data.csrf_token
        }));
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    }
    fetchCsrfToken();
  }, []);

  return (
    <>
      <div className="col-md-7">
        <div id="contact-header" className="d-md-flex align-items-center justify-content-end h-100">
          <h2 className="display-3 draw-line cake inview animated delay-1 static">GET IN TOUCH</h2>
        </div>
      </div>
      <div className="col-md-5">
        <div className="inview animated static">
          <form autoComplete="on" className="react-form-contents" onSubmit={handleSubmit}>
            <div className="row gx-2">
              <div className="col-md-6">
                <input type="text" className="form-control" name="FNAME" placeholder="First Name" aria-label="First name" value={fields.FNAME}
                  onChange={handleFieldChange('FNAME')} required />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" name="LNAME" placeholder="Last Name" aria-label="Last name" value={fields.LNAME}
                  onChange={handleFieldChange('LNAME')} required />
              </div>
            </div>
            <div className="col-12">
              <input type="email" className="form-control" name="EMAIL" placeholder="Email Address" value={fields.EMAIL}
                onChange={handleFieldChange('EMAIL')} required />
            </div>
            <div className="col-12">
              <textarea className="form-control" name="MESSAGE" placeholder="Message" required value={fields.MESSAGE}
                onChange={handleFieldChange('MESSAGE')} />
            </div>
            <div className="col-12">
              <input type="hidden" name="CSRF" defaultValue={fields.CSRF} />
              <button type="submit" className="btn btn-submit cake theme text-uppercase" id="submit-btn">Submit Message</button>
            </div>
            {(status.error || status.message) && (
              <div className={`alert mt-3 ${status.error ? 'alert-danger' : 'alert-success'}`}>
                {status.error ? status.error : status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
