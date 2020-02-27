<template functional>
    <svg
        :class="[data.staticClass, data.class]"
        :style="[data.staticStyle, data.style]"
        :width="props.size || 20"
        :height="props.size || 20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M4 5l6 6 6-6 2 2-8 8-8-8 2-2z" />
    </svg>
</template>
