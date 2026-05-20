import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const COLORS = {
  primary: "#1A5C38",      // Verde oscuro
  secondary: "#4F7942",    // Verde medio
  accent: "#8B4513",       // Marrón / tierra
  light: "#F8F5F2",        // Fondo claro
  white: "#FFFFFF",
  dark: "#2C2C2C",
  gray: "#7A7A7A",
  lightGray: "#E0E0E0",
  error: "#D32F2F",
};

const SIZES = {
  base: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  radius: 12,
};

// ────────────────────────────────────────────────────────────
// ESTILOS PARA HOME SCREEN
// ────────────────────────────────────────────────────────────
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: SIZES.base * 2,
  },
  list: {
    paddingBottom: 100, // Espacio para el botón flotante
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 2,
    marginBottom: SIZES.base * 2,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3, // Sombra Android
    shadowColor: COLORS.dark, // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.lightGray,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  cardInfo: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  commonName: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: SIZES.base / 2,
  },
  scientificName: {
    fontSize: SIZES.small,
    fontStyle: "italic",
    color: COLORS.secondary,
    marginBottom: SIZES.base / 2,
  },
  habitat: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  cardActions: {
    flexDirection: "row",
    gap: SIZES.base, // Espacio entre botones
  },
  editBtn: {
    backgroundColor: COLORS.secondary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  editBtnText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  deleteBtnText: {
    fontSize: 20,
    padding: SIZES.base,
  },
  fab: {
    position: "absolute",
    bottom: SIZES.base * 3,
    right: SIZES.base * 3,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontWeight: "300",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.base * 4,
  },
  loadingText: {
    marginTop: SIZES.base,
    color: COLORS.gray,
    fontSize: SIZES.medium,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontStyle: "italic",
  },
});

// ────────────────────────────────────────────────────────────
// ESTILOS PARA FORM SCREEN
// ────────────────────────────────────────────────────────────
export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    padding: SIZES.base * 3,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SIZES.base * 3,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: SIZES.base * 2.5,
  },
  label: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: SIZES.base,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 1.5,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top", // Para que el texto empiece arriba en Android
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    backgroundColor: COLORS.lightGray,
  },
  placeholderBox: {
    width: "100%",
    height: 150,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  placeholderText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  imageBtn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.base * 1.2,
    borderRadius: SIZES.radius / 2,
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  imageBtnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "500",
  },
  resetBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius / 2,
    alignItems: "center",
  },
  resetBtnText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base * 1.8,
    borderRadius: SIZES.radius,
    alignItems: "center",
    marginTop: SIZES.base * 2,
    elevation: 3,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
});

// ────────────────────────────────────────────────────────────
// ESTILOS PARA DETALLE SCREEN (por si lo usas)
// ────────────────────────────────────────────────────────────
export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  image: {
    width: width,
    height: 250,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SIZES.base * 3,
  },
  dataCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 2,
    marginTop: -SIZES.base * 4,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  commonName: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SIZES.base / 2,
  },
  scientificName: {
    fontSize: SIZES.large,
    fontStyle: "italic",
    color: COLORS.secondary,
    marginBottom: SIZES.base * 1.5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.base * 1.5,
  },
  field: {
    marginBottom: SIZES.base,
  },
  fieldLabel: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: SIZES.base / 2,
  },
  fieldValue: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.base * 2,
  },
  editBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    marginRight: SIZES.base / 2,
    alignItems: "center",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    marginLeft: SIZES.base / 2,
    alignItems: "center",
  },
  editBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  deleteBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SIZES.base,
    fontSize: SIZES.medium,
    color: COLORS.dark,
    textAlign: "center",
  },
});