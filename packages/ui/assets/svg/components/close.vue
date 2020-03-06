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
        <path d="M19 2l-1-1-8 8-8-8-1 1 8 8-8 8 1 1 8-8 8 8 1-1-8-8 8-8z"/>
    </svg>
</template>
