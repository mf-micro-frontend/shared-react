## Features
- **Shared App (React):**
  - Stores and exporters shared components(Button, Search) used by other mfs.

### Install dependencies for each repository:

```sh
pnpm install
```

### Environment Variables

Add `.env` to the root of repo. Below is an example `.env` file:

```sh
VITE_HOST_APP_URL=http://localhost:5001
VITE_BOOK_LIST_APP_URL=http://localhost:5002
VITE_SINGLE_BOOK_APP_URL=http://localhost:5003
VITE_SHARED_APP_URL=http://localhost:5099
```

Ensure you configure these appropriately for local development.

### Run each application:

```sh
pnpm run start-mf
```

Ensure all micro frontends are running and available for the host app to load.

## 🤝 Contribution

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
