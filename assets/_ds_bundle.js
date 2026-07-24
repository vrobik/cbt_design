/* @ds-bundle: {"format":4,"namespace":"CBTDesignSystem_f19338","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"PixelDivider","sourcePath":"components/brand/PixelDivider.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"EventCard","sourcePath":"components/content/EventCard.jsx"},{"name":"StatsBand","sourcePath":"components/content/StatsBand.jsx"},{"name":"Testimonial","sourcePath":"components/content/Testimonial.jsx"},{"name":"CookieBanner","sourcePath":"components/feedback/CookieBanner.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"d04aed941eaf","components/brand/PixelDivider.jsx":"dd447d0e86ee","components/content/Card.jsx":"d44ca6381698","components/content/EventCard.jsx":"7ba9ab177958","components/content/StatsBand.jsx":"6ea9a7d2b610","components/content/Testimonial.jsx":"263c5ebf0f41","components/feedback/CookieBanner.jsx":"c86ccd0e019d","components/forms/Button.jsx":"389a2b7a64df","components/forms/Checkbox.jsx":"8269fec1e406","components/forms/Input.jsx":"c4716b89ee4a","ui_kits/website/ContactPage.jsx":"bd585a93287d","ui_kits/website/EventsPage.jsx":"06296789fe74","ui_kits/website/HomePage.jsx":"64eafa8848ef","ui_kits/website/SimplePage.jsx":"d64a1cc94247","ui_kits/website/SiteChrome.jsx":"8318f60694cb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CBTDesignSystem_f19338 = window.CBTDesignSystem_f19338 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Logo — renders one of the supplied CBT logo assets as an <img>.
 * The brand ships eight PNG variants; pass the asset path via `src`.
 * Never redraw the mark — always use the provided artwork.
 */
function Logo({
  variant = 'color',
  // 'color' | 'black' | 'white'
  mark = false,
  // true = pictogram only (no wordmark), false = full lockup
  src,
  height = 40,
  alt = 'CBT — Comunitatea Basarabenilor din Timișoara',
  style,
  ...rest
}) {
  const base = mark ? 'mark' : 'logo';
  const resolved = src || `assets/${base}-${variant}.png`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: resolved,
    alt: alt,
    style: {
      height: typeof height === 'number' ? `${height}px` : height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/PixelDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PixelDivider — the CBT signature motif: individual squares forming a whole,
 * a metaphor for the community (many people, one image). Use sparingly:
 * as a divider between sections, an active-page marker, or a corner accent.
 */
function PixelDivider({
  colors = ['b', 'b', 'g', 'r'],
  size,
  gap = 4,
  align = 'left',
  style,
  ...rest
}) {
  const map = {
    b: 'var(--cbt-albastru)',
    g: 'var(--cbt-galben)',
    r: 'var(--cbt-rosu)',
    n: 'var(--cbt-negru)'
  };
  const px = size || 'var(--pixel)';
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      display: 'flex',
      gap: `${gap}px`,
      justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      ...style
    }
  }, rest), colors.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: px,
      height: px,
      background: map[c] || map.b,
      display: 'block'
    }
  })));
}
Object.assign(__ds_scope, { PixelDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PixelDivider.jsx", error: String((e && e.message) || e) }); }

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface: white, 1px subtle border, 12px radius, soft shadow
 * that lifts and tints blue on hover. Use for generic content blocks.
 * Set `hoverable={false}` for static cards (e.g. inside grids that don't link out).
 */
function Card({
  hoverable = true,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--sp-4)',
      boxShadow: hoverable && hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: hoverable && hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-slow) var(--ease), transform var(--dur-slow) var(--ease)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/EventCard.jsx
try { (() => {
/**
 * EventCard — the gateway to a single event page. Image area (or brand-gradient
 * placeholder) with a yellow mono date chip, then title, location and a short
 * two-line description.
 */
function EventCard({
  date,
  title,
  location,
  description,
  image,
  accent = 'albastru',
  onClick,
  style
}) {
  const gradients = {
    albastru: 'linear-gradient(135deg, var(--cbt-albastru) 0%, var(--cbt-albastru-inchis) 100%)',
    rosu: 'linear-gradient(135deg, var(--cbt-rosu) 0%, var(--cbt-rosu-inchis) 100%)'
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    onClick: onClick,
    style: {
      padding: 0,
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      position: 'relative',
      background: image ? `center/cover no-repeat url(${image})` : gradients[accent] || gradients.albastru
    }
  }, date && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--sp-3)',
      left: 'var(--sp-3)',
      background: 'var(--cbt-galben)',
      color: 'var(--cbt-negru)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-label)',
      padding: '6px 12px',
      borderRadius: 'var(--radius-sm)'
    }
  }, date)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-h3)',
      fontWeight: 'var(--fw-bold)',
      margin: 0
    }
  }, title), location && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-label)',
      color: 'var(--cbt-gri-60)',
      fontFamily: 'var(--font-mono)'
    }
  }, location), description && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--sp-2)',
      color: 'var(--cbt-gri-60)',
      fontSize: 'var(--fs-small)',
      lineHeight: 1.55
    }
  }, description)));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/content/StatsBand.jsx
try { (() => {
/**
 * StatsBand — the concrete-numbers row: black band, radius-lg, yellow mono
 * figures over a small grey caption. Numbers are always JetBrains Mono.
 */
function StatsBand({
  stats = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
      gap: 'var(--sp-4)',
      textAlign: 'center',
      background: 'var(--cbt-negru)',
      color: 'var(--cbt-alb)',
      padding: 'var(--sp-6) var(--sp-4)',
      borderRadius: 'var(--radius-lg)',
      ...style
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      letterSpacing: '-0.02em',
      color: 'var(--cbt-galben)'
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--cbt-gri-30)'
    }
  }, s.label))));
}
Object.assign(__ds_scope, { StatsBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatsBand.jsx", error: String((e && e.message) || e) }); }

// components/content/Testimonial.jsx
try { (() => {
/**
 * Testimonial — a short member quote on a flat grey surface (no shadow, no lift)
 * with an initials avatar and an origin line ("Chișinău → Timișoara").
 * Real photos/names require written consent — CBT's responsibility.
 */
function Testimonial({
  quote,
  name,
  origin,
  initials,
  accent = 'albastru',
  style
}) {
  const avatarBg = accent === 'rosu' ? 'var(--cbt-rosu)' : accent === 'galben' ? 'var(--cbt-galben)' : 'var(--cbt-albastru)';
  const init = initials || (name ? name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() : '');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cbt-gri-10)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--sp-4)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body)',
      lineHeight: 1.55,
      fontWeight: 'var(--fw-medium)'
    }
  }, "\u201E", quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      marginTop: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: avatarBg,
      color: accent === 'galben' ? 'var(--cbt-negru)' : 'var(--cbt-alb)',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 'var(--fw-bold)',
      flexShrink: 0
    }
  }, init), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-small)'
    }
  }, name), origin && /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--cbt-gri-60)',
      fontSize: 'var(--fs-label)'
    }
  }, origin))));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — CBT action hierarchy. Always a pill (radius 999px), min-height 48px
 * (mobile touch target). Yellow `primary` is reserved for THE single main action
 * per screen ("Înscrie-te în comunitate"); `secondary` is a discreet outline;
 * `dark` (blue) is for tertiary actions on inner pages.
 */
function Button({
  variant = 'primary',
  // 'primary' | 'secondary' | 'dark'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  disabled = false,
  as: Tag = 'button',
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '10px 20px',
      fontSize: 'var(--fs-small)',
      minHeight: 40
    },
    md: {
      padding: '14px 30px',
      fontSize: 'var(--fs-body)',
      minHeight: 48
    },
    lg: {
      padding: '18px 36px',
      fontSize: 'var(--fs-body-lg)',
      minHeight: 48
    }
  };
  const variants = {
    primary: {
      background: 'var(--cbt-galben)',
      color: 'var(--cbt-negru)',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-action)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--cbt-negru)',
      border: '1.5px solid var(--cbt-gri-30)'
    },
    dark: {
      background: 'var(--cbt-albastru)',
      color: 'var(--cbt-alb)',
      border: '1.5px solid transparent',
      boxShadow: '0 2px 10px rgba(47,68,138,0.25)'
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === 'button' ? disabled : undefined,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sp-2)',
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--fw-semibold)',
      textDecoration: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      opacity: disabled ? 0.45 : 1,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CookieBanner.jsx
try { (() => {
/**
 * CookieBanner — GDPR consent (EU requirement). Accept and Refuse are equally
 * accessible; GA4 loads only after Accept. Floating popover with a strong shadow.
 */
function CookieBanner({
  message = 'Folosim cookie-uri pentru statistici anonime (Google Analytics). Le poți accepta sau refuza — site-ul funcționează la fel.',
  onAccept,
  onRefuse,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cbt-alb)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--sp-4)',
      boxShadow: 'var(--shadow-pop)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--sp-3)',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 720,
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      maxWidth: '46ch',
      margin: 0,
      color: 'var(--cbt-gri-90)'
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onAccept
  }, "Accept"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    onClick: onRefuse
  }, "Refuz")));
}
Object.assign(__ds_scope, { CookieBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CookieBanner.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — consent / opt-in control. 20px box, blue accent, label may
 * contain links (e.g. the GDPR privacy-policy line).
 */
function Checkbox({
  label,
  id,
  checked,
  onChange,
  children,
  style,
  ...rest
}) {
  const fieldId = id || 'checkbox';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-2)',
      alignItems: 'flex-start',
      fontSize: 'var(--fs-small)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: fieldId,
    checked: checked,
    onChange: onChange,
    style: {
      width: 20,
      height: 20,
      marginTop: 2,
      accentColor: 'var(--cbt-albastru)',
      flexShrink: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontWeight: 'var(--fw-regular)',
      lineHeight: 1.5
    }
  }, label || children));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field. 2px border, 48px min-height, blue focus,
 * red border + message on error. Mark optional fields explicitly.
 */
function Input({
  label,
  id,
  type = 'text',
  optional = false,
  error,
  hint,
  value,
  placeholder,
  onChange,
  style,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--sp-4)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-small)',
      marginBottom: 'var(--sp-2)'
    }
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-regular)',
      color: 'var(--cbt-gri-60)'
    }
  }, " (op\u021Bional)")), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    "aria-invalid": !!error,
    style: {
      width: '100%',
      padding: '14px 16px',
      minHeight: 48,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--fs-body)',
      color: 'var(--cbt-gri-90)',
      border: `2px solid ${error ? 'var(--cbt-rosu)' : 'var(--cbt-gri-30)'}`,
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      transition: 'border-color var(--dur-fast) var(--ease)',
      ...style
    },
    onFocus: e => {
      if (!error) e.target.style.borderColor = 'var(--cbt-albastru)';
    },
    onBlur: e => {
      if (!error) e.target.style.borderColor = 'var(--cbt-gri-30)';
    }
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cbt-rosu)',
      fontSize: 'var(--fs-label)',
      marginTop: 'var(--sp-1)',
      display: 'block'
    }
  }, error), !error && hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cbt-gri-60)',
      fontSize: 'var(--fs-label)',
      marginTop: 'var(--sp-1)',
      display: 'block'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactPage.jsx
try { (() => {
// Join / Contact page — 3-field form + GDPR, with thank-you state
const {
  Button,
  Input,
  Checkbox,
  PixelDivider
} = window.CBTDesignSystem_f19338;
function ContactPage() {
  const [sent, setSent] = React.useState(false);
  const [nume, setNume] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [oras, setOras] = React.useState('');
  const [gdpr, setGdpr] = React.useState(false);
  const [err, setErr] = React.useState('');
  function submit() {
    if (!nume.trim()) {
      setErr('nume');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErr('email');
      return;
    }
    if (!gdpr) {
      setErr('gdpr');
      return;
    }
    setErr('');
    setSent(true);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: '0 auto',
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-label)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cbt-albastru)',
      marginBottom: 8
    }
  }, "\xCEnscriere"), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cbt-albastru-10)',
      border: '1px solid var(--cbt-gri-10)',
      borderRadius: 'var(--radius-lg)',
      padding: 32
    }
  }, /*#__PURE__*/React.createElement(PixelDivider, {
    colors: ['b', 'g', 'r'],
    size: "14px",
    gap: 5,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 12px'
    }
  }, "Te-am ad\u0103ugat pe list\u0103! \uD83C\uDF89"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-90)',
      margin: '0 0 20px'
    }
  }, "\xCEntre timp, intr\u0103 \xEEn grupul nostru de Facebook \u2014 acolo anun\u021B\u0103m \xEEnt\xE2i evenimentele."), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    variant: "dark"
  }, "Deschide grupul de Facebook")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-h1)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 8px'
    }
  }, "Devino membru"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-60)',
      margin: '0 0 32px'
    }
  }, "Doar trei c\xE2mpuri. F\u0103r\u0103 spam \u2014 te anun\u021B\u0103m doar la evenimente."), /*#__PURE__*/React.createElement(Input, {
    label: "Nume \u0219i prenume",
    value: nume,
    onChange: e => setNume(e.target.value),
    placeholder: "ex. Ana Munteanu",
    error: err === 'nume' ? 'Spune-ne cum te cheamă.' : ''
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "ana@exemplu.ro",
    error: err === 'email' ? 'Adresa de email nu pare completă — verific-o, te rog.' : ''
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Ora\u0219ul de origine",
    optional: true,
    value: oras,
    onChange: e => setOras(e.target.value),
    placeholder: "ex. Cahul"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '8px 0 24px'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: gdpr,
    onChange: e => setGdpr(e.target.checked),
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Sunt de acord ca datele mele s\u0103 fie folosite pentru comunic\u0103ri legate de activitatea CBT, conform ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: 'var(--cbt-albastru)',
        fontWeight: 600
      }
    }, "Politicii de Confiden\u021Bialitate"), ".")
  }), err === 'gdpr' && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cbt-rosu)',
      fontSize: 'var(--fs-label)',
      display: 'block',
      marginTop: 6
    }
  }, "Bifeaz\u0103 acordul ca s\u0103 te putem contacta.")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: submit,
    style: {
      width: '100%'
    }
  }, "\xCEnscrie-te \xEEn comunitate")));
}
Object.assign(window, {
  ContactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EventsPage.jsx
try { (() => {
// Events listing page
const {
  EventCard,
  PixelDivider
} = window.CBTDesignSystem_f19338;
function EventsPage({
  go
}) {
  const events = [['14 MAR 2026', 'Mărțișor basarabean', 'Casa Tineretului, Timișoara', 'Sărbătorim primăvara cu tradiții de acasă — atelier de mărțișoare și muzică.', 'albastru'], ['27 AUG 2026', 'Ziua Independenței RM', 'Parcul Rozelor, Timișoara', 'Concert, mâncare basarabeană și voie bună în aer liber.', 'rosu'], ['01 DEC 2026', 'Seara de colinde basarabene', 'Sala Capitol, Timișoara', 'Colinde de acasă, la lumânare, alături de comunitate.', 'albastru'], ['15 IAN 2026', 'Cenaclu: poeți basarabeni', 'Cafeneaua Verde, Timișoara', 'Seară de lectură dedicată lui Grigore Vieru.', 'rosu'], ['20 FEB 2026', 'Ajutor pentru studenți noi', 'Sediul CBT', 'Sesiune de orientare pentru studenții proaspăt veniți.', 'albastru'], ['09 MAI 2026', 'Ziua Europei — stand CBT', 'Piața Victoriei, Timișoara', 'Ne găsești în piață cu bucate și povești basarabene.', 'rosu']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '0 auto',
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-label)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cbt-albastru)',
      marginBottom: 8
    }
  }, "Evenimente"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-h1)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 8px'
    }
  }, "Ce se \xEEnt\xE2mpl\u0103 la CBT"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-60)',
      maxWidth: '60ch',
      margin: 0
    }
  }, "Fiecare eveniment are pagin\u0103 proprie cu detalii, loca\u021Bie \u0219i \xEEnscriere."), /*#__PURE__*/React.createElement(PixelDivider, {
    colors: ['b', 'b', 'g', 'r'],
    size: "12px",
    gap: 5,
    style: {
      margin: '24px 0 32px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
      gap: 24
    }
  }, events.map((e, i) => /*#__PURE__*/React.createElement(EventCard, {
    key: i,
    date: e[0],
    title: e[1],
    location: e[2],
    description: e[3],
    accent: e[4],
    onClick: () => {}
  }))));
}
Object.assign(window, {
  EventsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EventsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
// CBT Homepage — hero, benefits, stats, events, testimonials, closing CTA
const {
  Button,
  Card,
  EventCard,
  StatsBand,
  Testimonial,
  PixelDivider
} = window.CBTDesignSystem_f19338;
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-label)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cbt-albastru)',
      marginBottom: 8
    }
  }, children);
}
function Section({
  children,
  alt,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '64px 32px',
      background: alt ? 'var(--cbt-gri-10)' : 'var(--cbt-alb)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '0 auto'
    }
  }, children));
}
function HomePage({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cbt-negru)',
      color: 'var(--cbt-alb)',
      padding: '96px 32px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(PixelDivider, {
    colors: ['b', 'g', 'r'],
    size: "16px",
    gap: 5,
    style: {
      marginBottom: 24
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-display)',
      fontWeight: 900,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
      maxWidth: '16ch',
      margin: 0
    }
  }, "Acas\u0103, la 700 km de cas\u0103."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-30)',
      marginTop: 16,
      maxWidth: '52ch',
      fontSize: 'var(--fs-body-lg)'
    }
  }, "Comunitatea Basarabenilor din Timi\u0219oara adun\u0103 oamenii veni\u021Bi din Republica Moldova \u2014 pentru evenimente, sprijin \u0219i prietenii care \u021Bin."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('contact')
  }, "\xCEnscrie-te \xEEn comunitate"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('contact'),
    style: {
      color: 'var(--cbt-alb)',
      borderColor: 'var(--cbt-gri-60)'
    }
  }, "Scrie-ne"))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -20,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 26px)',
      gap: 5,
      opacity: 0.9
    }
  }, ['b', '', 'g', 'g', '', 'r', '', 'b', '', 'g', 'r', '', 'b', 'b', 'g', '', 'r', 'r', '', 'b', '', 'r', '', 'r'].map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 26,
      height: 26,
      background: c === 'b' ? 'var(--cbt-albastru)' : c === 'g' ? 'var(--cbt-galben)' : c === 'r' ? 'var(--cbt-rosu)' : 'transparent'
    }
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Eyebrow, null, "De ce CBT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 8px'
    }
  }, "Ce prime\u0219ti ca membru"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-60)',
      maxWidth: '60ch',
      margin: '0 0 32px'
    }
  }, "Spa\u021Biu preg\u0103tit pentru beneficiile pe care CBT le va defini \u2014 pagina nu va trebui reconstruit\u0103."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
      gap: 24
    }
  }, [['b', 'Comunitate', 'Întâlniri lunare și un grup activ de oameni care te înțeleg.'], ['g', 'Beneficiu de definit', 'Spațiu rezervat — se completează la nevoie.'], ['r', 'Beneficiu de definit', 'Spațiu rezervat — se completează la nevoie.']].map(([c, t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    hoverable: i === 0,
    style: i === 0 ? {} : {
      border: '2px dashed var(--cbt-gri-30)',
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 6,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--cbt-albastru-10)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      background: c === 'b' ? 'var(--cbt-albastru)' : c === 'g' ? 'var(--cbt-galben)' : 'var(--cbt-rosu)'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-h3)',
      fontWeight: 700,
      margin: '0 0 6px',
      color: i === 0 ? 'inherit' : 'var(--cbt-gri-60)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-60)',
      fontSize: 'var(--fs-small)',
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    alt: true
  }, /*#__PURE__*/React.createElement(StatsBand, {
    stats: [{
      value: 248,
      label: 'membri activi'
    }, {
      value: 36,
      label: 'evenimente organizate'
    }, {
      value: 7,
      label: 'ani de comunitate'
    }]
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Evenimente \xB7 2026"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 24px'
    }
  }, "Ce urmeaz\u0103"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(EventCard, {
    date: "14 MAR 2026",
    title: "M\u0103r\u021Bi\u0219or basarabean",
    location: "Casa Tineretului, Timi\u0219oara",
    description: "S\u0103rb\u0103torim prim\u0103vara cu tradi\u021Bii de acas\u0103.",
    onClick: () => go('evenimente')
  }), /*#__PURE__*/React.createElement(EventCard, {
    date: "27 AUG 2026",
    title: "Ziua Independen\u021Bei RM",
    accent: "rosu",
    location: "Parcul Rozelor, Timi\u0219oara",
    description: "Concert, m\xE2ncare \u0219i voie bun\u0103 \xEEn aer liber.",
    onClick: () => go('evenimente')
  }), /*#__PURE__*/React.createElement(EventCard, {
    date: "01 DEC 2026",
    title: "Seara de colinde",
    location: "Sala Capitol, Timi\u0219oara",
    description: "Colinde basarabene, la lum\xE2nare.",
    onClick: () => go('evenimente')
  }))), /*#__PURE__*/React.createElement(Section, {
    alt: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Voci din comunitate"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 24px'
    }
  }, "Ce spun membrii"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Testimonial, {
    quote: "C\xE2nd am ajuns la Timi\u0219oara nu cuno\u0219team pe nimeni. Prin CBT mi-am g\u0103sit prietenii de aici.",
    name: "Maria C.",
    origin: "Chi\u0219in\u0103u \u2192 Timi\u0219oara"
  }), /*#__PURE__*/React.createElement(Testimonial, {
    quote: "Evenimentele comunit\u0103\u021Bii m-au ajutat s\u0103 r\u0103m\xE2n aproape de cas\u0103, chiar \u0219i la 700 km distan\u021B\u0103.",
    name: "Ion B.",
    origin: "B\u0103l\u021Bi \u2192 Timi\u0219oara",
    accent: "rosu"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cbt-albastru)',
      color: 'var(--cbt-alb)',
      padding: '80px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h1)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 16px'
    }
  }, "Gata s\u0103 faci parte?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 'var(--fs-body-lg)',
      margin: '0 0 28px'
    }
  }, "Trei c\xE2mpuri, un minut. Te ad\u0103ug\u0103m pe list\u0103 \u0219i te anun\u021B\u0103m la urm\u0103torul eveniment."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('contact')
  }, "\xCEnscrie-te \xEEn comunitate"))));
}
Object.assign(window, {
  HomePage,
  Eyebrow,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SimplePage.jsx
try { (() => {
// Simple content page shell for the remaining nav items
const {
  PixelDivider
} = window.CBTDesignSystem_f19338;
const PAGES = {
  cine: {
    eyebrow: 'Cine suntem',
    title: 'O comunitate, mulți oameni',
    lead: 'CBT adună basarabenii stabiliți în Timișoara — studenți, familii, profesioniști — în jurul aceleiași idei: să nu fim singuri departe de casă.',
    body: 'Ne-am format în 2019 dintr-un grup mic de prieteni. Astăzi organizăm evenimente lunare, sprijinim studenții nou-veniți și ținem viu ce am adus de acasă: limba, tradițiile, gustul pâinii de la Chișinău.'
  },
  proiecte: {
    eyebrow: 'Ce facem',
    title: 'Proiectele noastre',
    lead: 'Proiecte trecute și viitoare — de la ateliere culturale la rețele de sprijin pentru nou-veniți.',
    body: 'Fiecare proiect pornește de la o nevoie reală a comunității. Aici vei găsi, în curând, arhiva completă cu rezultate, poze și parteneri.'
  },
  noutati: {
    eyebrow: 'Noutăți & Presă',
    title: 'Ce mai e nou',
    lead: 'Articole, comunicate de presă și press kit descărcabil — logo-uri high-res și poze de arhivă.',
    body: 'Materialele de presă sunt disponibile direct pe site, fără să le ceri pe email. Secțiunea se populează pe măsură ce publicăm.'
  }
};
function SimplePage({
  page
}) {
  const p = PAGES[page] || PAGES.cine;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-label)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cbt-albastru)',
      marginBottom: 8
    }
  }, p.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-h1)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      margin: '0 0 16px'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--cbt-gri-90)',
      margin: '0 0 16px'
    }
  }, p.lead), /*#__PURE__*/React.createElement(PixelDivider, {
    colors: ['b', 'g', 'r'],
    size: "12px",
    gap: 5,
    style: {
      margin: '8px 0 24px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--cbt-gri-60)',
      lineHeight: 1.7
    }
  }, p.body));
}
Object.assign(window, {
  SimplePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SimplePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
// Nav + Footer chrome for the CBT site
const {
  Button,
  Logo,
  PixelDivider
} = window.CBTDesignSystem_f19338;
const NAV = [['acasa', 'Acasă'], ['cine', 'Cine suntem'], ['proiecte', 'Proiecte'], ['evenimente', 'Evenimente'], ['noutati', 'Noutăți'], ['contact', 'Contact']];
function SiteNav({
  page,
  go
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      padding: '16px 32px',
      background: 'var(--cbt-alb)',
      borderBottom: '1px solid var(--cbt-gri-10)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('acasa');
    },
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "color",
    src: "../../assets/logo-color.png",
    height: 38
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      gap: 24,
      listStyle: 'none',
      margin: 0,
      padding: 0,
      flexWrap: 'wrap'
    }
  }, NAV.map(([id, label]) => {
    const active = page === id;
    return /*#__PURE__*/React.createElement("li", {
      key: id,
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go(id);
      },
      style: {
        textDecoration: 'none',
        color: active ? 'var(--cbt-albastru)' : 'var(--cbt-gri-90)',
        fontWeight: active ? 700 : 500,
        fontSize: 'var(--fs-small)'
      }
    }, label), active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: -6,
        left: 0,
        width: 10,
        height: 3,
        background: 'var(--cbt-galben)'
      }
    }));
  })), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go('contact')
  }, "\xCEnscrie-te"));
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--cbt-negru)',
      color: 'var(--cbt-gri-30)',
      padding: '48px 32px 32px',
      fontSize: 'var(--fs-small)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 32,
      maxWidth: 1140,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    mark: true,
    src: "../../assets/mark-white.png",
    height: 40
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '32ch',
      marginTop: 12
    }
  }, "Comunitatea Basarabenilor din Timi\u0219oara \u2014 asocia\u021Bie non-profit.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--cbt-alb)',
      fontSize: 'var(--fs-small)',
      marginBottom: 12
    }
  }, "Naviga\u021Bie"), [['cine', 'Cine suntem'], ['evenimente', 'Evenimente'], ['noutati', 'Noutăți']].map(([id, l]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(id);
    },
    style: {
      color: 'var(--cbt-gri-30)',
      textDecoration: 'none',
      display: 'block',
      marginBottom: 8
    }
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--cbt-alb)',
      fontSize: 'var(--fs-small)',
      marginBottom: 12
    }
  }, "Legal"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--cbt-gri-30)',
      textDecoration: 'none',
      display: 'block',
      marginBottom: 8
    }
  }, "Politica de confiden\u021Bialitate"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--cbt-gri-30)',
      textDecoration: 'none',
      display: 'block'
    }
  }, "Politica de cookie-uri")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--cbt-alb)',
      fontSize: 'var(--fs-small)',
      marginBottom: 12
    }
  }, "Urm\u0103re\u0219te-ne"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Facebook",
    style: socialStyle
  }, "f"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Instagram",
    style: socialStyle
  }, "\u25CE")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '32px auto 0',
      paddingTop: 24,
      borderTop: '1px solid var(--cbt-gri-90)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 CBT \u2014 Comunitatea Basarabenilor din Timi\u0219oara"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "basarabenitm.ro")));
}
const socialStyle = {
  width: 40,
  height: 40,
  border: '1px solid var(--cbt-gri-60)',
  borderRadius: 'var(--radius-sm)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--cbt-gri-30)',
  textDecoration: 'none'
};
Object.assign(window, {
  SiteNav,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PixelDivider = __ds_scope.PixelDivider;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.StatsBand = __ds_scope.StatsBand;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.CookieBanner = __ds_scope.CookieBanner;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

})();
