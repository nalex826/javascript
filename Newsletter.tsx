import { ChangeEvent, FC, useState } from 'react';
import ReactGA from 'react-ga4';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Social } from './Social';

type EmailFormFields = {
    EMAIL: string;
    tags: number;
};

const Newsletter: FC = () => {
    const NewsLetterTag = XXXXXX;
    const mailChimpUrl = 'https://XXXXXX.list-manage.com/subscribe/post?u=XXXXXXf&amp;f_id=XXXXXX';

    // Initialize state with useState  
    const [fields, setFields] = useState<EmailFormFields>({
        EMAIL: '',
        tags: NewsLetterTag
    });

    const handleFieldChange = (fieldName: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }));
    };

    const handleOnJoinMailList = () => {
        setFields({
            EMAIL: '',
            tags: NewsLetterTag
        });
        ReactGA.event({
            category: 'newsletter',
            action: 'Newsletter Widget',
            label: 'Newsletter'
        });
        return true;
    };

    return (
        <div id="newsletter">
            <div className="inview animated static">
                <h2 className="display-3 theme cake">SIGN UP FOR NEWSLETTER</h2>
                <p>Subscribe to newsletter for exclusive gaming updates. </p>

                <MailchimpSubscribe<EmailFormFields>
                    render={hooks => (
                        <form autoComplete="on" className="react-form-contents" onSubmit={e => {
                            e.preventDefault();
                            hooks.subscribe({
                                EMAIL: fields.EMAIL,
                                tags: NewsLetterTag
                            });
                        }}>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control mb-0" placeholder="Email Address" aria-label="Email Address" aria-describedby="submit-send" value={fields.EMAIL}
                                    onChange={handleFieldChange('EMAIL')} required />
                                <button className="btn btn-theme" type="submit" id="submit-send">SEND</button>
                            </div>
                            {hooks.status && (
                                <div className={`alert mt-3 ${hooks.status === 'error' ? 'alert-danger' : 'alert-success'}`}>
                                    {hooks.message instanceof Error ? hooks.message.message : hooks.message}
                                    {hooks.status === 'success' && handleOnJoinMailList()}
                                </div>
                            )}
                        </form>
                    )}
                    url={mailChimpUrl}
                /> 
            </div>
        </div>
    );
};

export default Newsletter;
