React-based Fannyky Front end application consuming the Ruby on Rails-based API at https://github.com/axelmukwena/fannyky-api.

Start up on dev
```
npm run dev
```

## Resources

### Set up and going

- https://medium.com/@martink_rsa/creating-a-react-app-with-create-react-app-and-material-ui-380985fc2b19

### Responsive forms

- https://leevi.info/responsive-forms/

### Login/SignUp form

- https://levelup.gitconnected.com/create-a-signup-page-with-react-and-material-ui-9b203d18cf3f

### Navigation bar with menu (Kinda useful)

- https://levelup.gitconnected.com/how-to-create-a-navigation-bar-with-material-ui-9cbcfcec2570

### Connecting front end to rails

- https://medium.com/@jennyjean8675309/connect-your-react-application-to-a-rails-api-using-active-storage-part-1-e59dcacc481b

### Redux states and cookies

- https://react-redux.js.org/tutorials/quick-start
- https://levelup.gitconnected.com/sessions-with-a-react-redux-frontend-and-rails-api-backend-25b7b951b287
- https://dev.to/kahawaiikailana/rails-api-quickstart-guide-with-postgressql-and-jwt-tokens-3pnk

### Redux Middleware

- https://stackoverflow.com/a/68421466/8050183
- https://redux-toolkit.js.org/api/getDefaultMiddleware

### Global User Details (Not used)

- https://blog.logrocket.com/a-deep-dive-into-react-context-api/
- https://codesandbox.io/s/context-nav-profile-example-r22jz?from-embed=&file=/src/App.js:286-508

### Fetching Data _Axios_ vs Fetch

- https://www.freecodecamp.org/news/how-to-use-axios-with-react/
- https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/

### Loading State (Not used)

- https://stackoverflow.com/a/69110667/8050183

### Authentication (Not Used)

- https://auth0.com/docs/quickstart/webapp/rails/01-login


### Lints

- `npm install --save-dev eslint prettier`
- `npm info "@imaginary-cloud/eslint-config-react@latest" peerDependencies`
- Install the above dependencies
- `npm install [package]@[version] --save-dev` | @latest always works, soo
- `npm install [package]@latest --save-dev`

### Photos with Pexels API

- https://medium.com/star-gazers/how-to-work-pexels-api-with-javascript-9cda16bbece9

### Canvas with Konva

- https://dev.to/ankursheel/react-component-to-fraw-on-a-page-using-hooks-and-typescript-2ahp
- http://jsfiddle.net/FgNQk/6/
- https://stackoverflow.com/questions/11179274/html-canvas-drawing-disappear-on-resizing

### PropTypes Validation

- https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/

### Material UI Carousel

- https://learus.github.io/react-material-ui-carousel/

### MUI 4 to 5
- https://dev.to/hasone/migrate-material-ui-4-to-mui-5-1g3i
- https://mui.com/guides/migration-v4/#update-material-ui-version

### Force update a component
- https://medium.com/@dev.cprice/wild-react-useforceupdate-e4459f2c1272
- https://gist.github.com/frzi/c9de4fa77f59ff1fb465265e0b227761#gistcomment-3698295

### Upload files
- https://codepen.io/tab4188/pen/mAyKJA

### Date Picker
- https://mui.com/components/pickers/
- https://github.com/date-fns/date-fns/issues/1772

      $ npm install @mui/lab
      $ npm install @date-io/date-fns
      $ npm i @date-io/date-fns@1.x date-fns --save

### Images with rails and react AWS S3 Active Storage
- Use DataForm to send FILE objects
- `images[]`, multiple files, in order to send an array to API https://stackoverflow.com/a/67389523/8050183
- No need to have `images` in required parameters, rails
- `Unable to autoload constant ActiveStorage::Blob::Analyzable`?
  - https://stackoverflow.com/a/65606185/8050183

- Setting up AWS S3 https://www.youtube.com/watch?v=OWBWXOcx1rU&t=171s&ab_channel=SupeRails

- If has many is removing files when updating https://stackoverflow.com/a/66994710/8050183

- Purge Images?
  - https://nicholasshirley.com/several-strategies-to-delete-activestorage-attachments/

### `.env` with React
- https://stackoverflow.com/a/68945430/8050183

### Rich Text Editor
- https://draftjs.org/docs/getting-started

      $ npm install draft-js
      $ npm install react-draft-wysiwyg
      $ npm install draft-convert
      $ npm install dompurify

- https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

### Redirect trailing strokes on URLs
- https://jasonwatmore.com/post/2020/03/23/react-router-remove-trailing-slash-from-urls

### Date picker example


    import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
    import AdapterDateFns from "@mui/lab/AdapterDateFns";

    <Grid item xs={6} md={4}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date Created"
          inputFormat="dd/MM/yyyy"
          value={dateCreated}
          onChange={(e) => setDateCreated(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
      </LocalizationProvider>
    </Grid>

### Lazy loading

- https://gist.github.com/asterisk37n/7a0425f8d2f68a46820cca640410ead5


### Dynamic Import
```
const Editor = dynamic( () => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false } )
```
- https://stackoverflow.com/a/55223488/8050183


### Static Rendering with Incremental Static Regeneration

- https://stackoverflow.com/a/67787457/8050183
- https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
- https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
- https://www.reddit.com/r/nextjs/comments/j3za9y/what_exactly_does_build_time_mean/
