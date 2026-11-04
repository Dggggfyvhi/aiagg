import{$r as e,Bn as t,Bs as n,Do as r,J as i,Js as a,Nr as o,Oo as s,Or as c,Qi as l,Rn as u,To as d,Vs as f,ai as p,bn as m,ca as h,ia as ee,ii as te,ks as g,na as ne,o as re,ps as ie,q as _,sn as ae,st as v,us as oe,zs as y}from"./three.module-B13ViZzU.js";import{a as b,d as se,n as ce,s as le,t as x,u as ue}from"./particleContent-CpIDRQb6.js";var S={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},C=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},de=new l(-1,1,1,-1,0,1),w=new class extends i{constructor(){super(),this.setAttribute(`position`,new m([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new m([0,2,0,0,2,0],2))}},fe=class{constructor(e){this._mesh=new te(w,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,de)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},pe=class extends C{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof s?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=g.clone(e.uniforms),this.material=new s({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new fe(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},T=class extends C{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},E=class extends C{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},me=class{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){let r=e.getSize(new y);this._width=r.width,this._height=r.height,n=new a(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:t}),n.texture.name=`EffectComposer.rt1`}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pe(S),this.copyPass.material.blending=0,this.timer=new ie}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}T!==void 0&&(r instanceof T?n=!0:r instanceof E&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},he=class extends C{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new v}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},D={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new v(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},ge=class e extends C{constructor(e,r=1,i,o){super(),this.strength=r,this.radius=i,this.threshold=o,this.resolution=e===void 0?new y(256,256):new y(e.x,e.y),this.clearColor=new v(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new a(c,l,{type:t}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let n=new a(c,l,{type:t});n.texture.name=`UnrealBloomPass.h`+e,n.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(n);let r=new a(c,l,{type:t});r.texture.name=`UnrealBloomPass.v`+e,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),c=Math.round(c/2),l=Math.round(l/2)}let u=D;this.highPassUniforms=g.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new s({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];let d=[6,10,14,18,22];c=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(d[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new y(1/c,1/l),c=Math.round(c/2),l=Math.round(l/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=r,this.compositeMaterial.uniforms.bloomRadius.value=.1;let f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new n(1,1,1),new n(1,1,1),new n(1,1,1),new n(1,1,1),new n(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=g.clone(S.uniforms),this.blendMaterial=new s({uniforms:this.copyUniforms,vertexShader:S.vertexShader,fragmentShader:S.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new v,this._oldClearAlpha=1,this._basic=new p,this._fsQuad=new fe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new y(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new s({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new y(.5,.5)},direction:{value:new y(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new s({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};ge.BlurDirectionX=new y(1,0),ge.BlurDirectionY=new y(0,1);var O=1.4,k=[6,40,35,45,0,45,60,45,50,150,70],A=[80,70,95,55,110,70,70,70,70,80];function _e(e,t){return e/Math.max(1,t)*100*O}function j(e,t){return e/100/O*t}var ve=[{swirl:.9,stagger:1.2},{swirl:.6,stagger:1},{swirl:.3,stagger:2.4},{swirl:.8,stagger:1},{swirl:0,stagger:.25},{swirl:.25,stagger:.8},{swirl:.7,stagger:1},{swirl:.7,stagger:1},{swirl:.5,stagger:1.2},{swirl:.6,stagger:1.4}];function M(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var N=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function P(){let e=[],t=0;for(let n=0;n<k.length;n++)e.push({type:`dwell`,k:n,start:t,end:t+k[n]}),t+=k[n],n<A.length&&(e.push({type:`travel`,k:n,start:t,end:t+A[n]}),t+=A[n]);let n=t,r=t=>e.find(e=>e.type===`dwell`&&e.k===t),i=t=>e.find(e=>e.type===`travel`&&e.k===t);function a(t){let r=Math.min(Math.max(t,0),n),i=e[e.length-1];for(let t of e)if(r<=t.end&&t.end>t.start){i=t;break}let a=Math.max(1e-6,i.end-i.start),o=Math.min(1,Math.max(0,(r-i.start)/a));if(i.type===`dwell`){let e=i.k;return e===0?{a:0,b:1,morph:0,dwellK:0,dwellP:o,travelK:-1,u:0}:{a:e-1,b:e,morph:1,dwellK:e,dwellP:o,travelK:-1,u:0}}return{a:i.k,b:i.k+1,morph:o,dwellK:-1,dwellP:0,travelK:i.k,u:o}}function o(e,t){let n=r(t),a=t>0?i(t-1):null,o=i(t),s=a?M(a.start+(a.end-a.start)*.55,a.end,e):1,c=o?1-M(o.start,o.start+(o.end-o.start)*.4,e):1;return e<n.start?s:e>n.end?c:1}function s(e,t,n={}){let a=e>0?i(e-1):null,o=i(t),s=a?a.start+(a.end-a.start)*(n.inAt??.55):-1/0,c=o?o.start+(o.end-o.start)*(n.outAt??.35):1/0;if(n.endInDwell!=null){let e=r(t);c=e.start+(e.end-e.start)*n.endInDwell}return{start:s,end:c}}function c(e){let t=r(e);return t.end-t.start<1?t.start:e===0?0:t.start+(t.end-t.start)*.5}return{segs:e,total:n,at:a,presence:o,chapterWindow:s,anchor:c,dwellOf:r,travelOf:i}}var ye=[{target:[0,0,0],offset:[0,.6,16.5],layout:`right`,fov:38},{target:[0,-.3,0],offset:[0,6.6,13.6],layout:`right`,fov:38},{target:[0,.1,0],offset:[0,.2,14.5],layout:`center`,fov:38},{target:[0,.35,-.3],offset:[0,.5,15.6],layout:`center`,fov:38,mobileZoom:1.4},{target:[0,0,0],offset:[-5,2.4,16.5],layout:`right`,fov:38},{target:[0,0,0],offset:[0,0,17.2],layout:`right`,fov:38},{target:[0,0,.4],offset:[4.2,1.3,17.4],layout:`right`,fov:38},{target:[0,.1,0],offset:[0,1.3,15.5],layout:`center`,fov:38},{target:[0,0,0],offset:[0,3.2,16.8],layout:`right`,fov:38},{target:[0,0,3],offset:[0,0,14],layout:`center`,fov:62,flight:!0},{target:[0,.2,-62],offset:[0,0,15],layout:`center`,fov:38}];function be(e,t,n){let r=ye[e];if(r.flight){let e=17-N(t)*61,n=Math.sin(t*5.5)*.9;return{pos:[n,Math.cos(t*4)*.5,e],target:[n*.4+Math.sin(t*3)*.6,Math.cos(t*2.4)*.35,e-14],layout:r.layout,fov:r.fov,roll:Math.sin(t*3.2)*.06,zoom:1}}let i=Math.sin(n*.15)*.25;return{pos:[r.target[0]+r.offset[0]+i,r.target[1]+r.offset[1],r.target[2]+r.offset[2]-t*.6],target:r.target,layout:r.layout,fov:r.fov,roll:0,zoom:r.mobileZoom||1}}var xe=`landingScrolled:v1`,F=[4.5,16],I=16,L=1.1,Se=.45,Ce=1.6;function we(){try{return globalThis.localStorage?.getItem(xe)===`1`}catch{return!1}}function Te(){try{globalThis.localStorage?.setItem(xe,`1`)}catch{}}function R(e){return e<0||e>3.1500000000000004?0:e<L?N(e/L):e<1.55?1:1-N((e-L-Se)/Ce)}function Ee({root:e,listen:t,heroEnd:n}){let r=!we(),i=!r,a=0,o=()=>{r=!1};for(let n of[`wheel`,`touchstart`,`pointerdown`,`keydown`])t(e,n,o,{passive:!0});function s(e,t,o){e>.5&&(r=!1),!i&&e>n&&(i=!0,Te());let s=r?Math.max(...F.map(e=>R(t-e)))*I:0;return a+=(s-a)*(1-Math.exp(-o*8)),a<.02?e:Math.max(e,n+a)}return{sceneTau:s}}var z=Math.PI*2;function B(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function V(e){let t=0;for(;t===0;)t=e();return Math.sqrt(-2*Math.log(t))*Math.cos(z*e())}var H=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function U(e){let t=parseInt(e.slice(1),16);return[H((t>>16&255)/255),H((t>>8&255)/255),H((t&255)/255)]}function W(e,t,n){return[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n]}function G(e,t){let n=Math.min(.9999,Math.max(0,t))*(e.length-1),r=Math.floor(n);return W(e[r],e[r+1],n-r)}var K={white:U(`#f4f7ff`),warm:U(`#fff1d6`),gold:U(`#ffcf8a`),ice:U(`#9fdcff`),blue:U(`#5b8cff`),violet:U(`#9a6bff`),cyan:U(`#5ef2ff`),pink:U(`#ff5fa2`),orange:U(`#ffb86b`),dimBlue:U(`#7f93c8`)},q={W:9.6,H:5.4},De=class{constructor(e,t,n){this.N=e,this.gw=t,this.gh=n,this.G=t*n,this.spacing=q.W/(t-1),this.buildAmbient()}buildAmbient(){let{N:e}=this,t=B(7);this.ambPos=new Float32Array(e*3),this.ambCol=new Float32Array(e*3),this.ambSize=new Float32Array(e);for(let n=0;n<e;n++){let e=(t()*2-1)*34,r=(t()*2-1)*20,i=-100+t()*108;Math.abs(e)<8&&Math.abs(r)<5&&i>-10&&(i-=22),this.ambPos.set([e,r,i],n*3);let a=t()<.025,o=a?.55+t()*.4:.08+t()**3*.28,s=W(K.white,t()<.5?K.ice:K.violet,t()*.6);this.ambCol.set([s[0]*o,s[1]*o,s[2]*o],n*3),this.ambSize[n]=a?.13+t()*.08:.05+t()**4*.06}}base(e){let{N:t}=this,n=B(e),r=new Float32Array(t);for(let e=0;e<t;e++)r[e]=n();return{pos:this.ambPos.slice(),col:this.ambCol.slice(),size:this.ambSize.slice(),par:new Float32Array(t),delay:r,mid:null,fx:[0,0,0,0],gx:[0,0,0,.35]}}orb(){let e=this.base(11),t=B(101),n=Math.floor(this.N*.6);for(let r=0;r<n;r++){let n=t(),i,a,o;if(n<.6){let n=t()*2-1,s=t()*z,c=Math.sqrt(1-n*n),l=[c*Math.cos(s),n,c*Math.sin(s)],u=Math.sin(l[0]*3.1+1.3)*Math.sin(l[1]*2.7)*Math.sin(l[2]*3.4+.4),d=2.7*(1+.11*u)+V(t)*.04;i=[l[0]*d,l[1]*d,l[2]*d];let f=.5+.5*Math.sin(l[1]*2.2+l[0]*1.4+u*2);a=G([K.cyan,K.blue,K.violet],f);let p=.34+t()*.36;a=a.map(e=>e*p),o=.05+t()*.035,t()<.035&&(a=K.white.map(e=>e*.95),o=.14),e.par[r]=1}else if(n<.68){let e=t()*2-1,n=t()*z,r=Math.sqrt(1-e*e),s=1.05*t()**2.2;i=[r*Math.cos(n)*s,e*s,r*Math.sin(n)*s],a=K.warm.map(e=>e*.5),o=.06}else{let e=t()<.5,n=(e?4.55:3.9)+V(t)*.06,r=t()*z,s=Math.cos(r)*n,c=V(t)*.03,l=Math.sin(r)*n,u=e?-1.05:1.2,d=e?-.45:.3;[c,l]=[c*Math.cos(u)-l*Math.sin(u),c*Math.sin(u)+l*Math.cos(u)],[s,c]=[s*Math.cos(d)-c*Math.sin(d),s*Math.sin(d)+c*Math.cos(d)],i=[s,c,l];let f=t()<.1?.8:.3;a=K.ice.map(e=>e*f),o=.045}e.pos.set(i,r*3),e.col.set(a,r*3),e.size[r]=o}return e.fx=[.06,.05,0,0],e.gx=[0,.24,0,.35],e}disk(){let e=this.base(12),t=B(102),n=Math.floor(this.N*.62),r=[1.5,2.4,3.3,4.3,5.3];for(let i=0;i<n;i++){let n=t(),a,o,s=.05+t()*.03;if(n<.07){let e=t()*2-1,n=t()*z,r=Math.sqrt(1-e*e),i=.6*t()**1.4;a=[r*Math.cos(n)*i,e*i*.7,r*Math.sin(n)*i],o=K.warm.map(e=>e*.85),s=.07+t()*.05}else if(n<.7){let e=r[Math.floor(t()*r.length)],n=e+V(t)*(.07+e*.012),i=t()*z;a=[Math.cos(i)*n,V(t)*.04,Math.sin(i)*n];let c=(e-1.5)/3.8;o=c<.5?W(K.gold,K.ice,c*2):W(K.ice,K.violet,c*2-1);let l=.32+t()*.34;o=o.map(e=>e*l),t()<.03&&(o=K.white.map(e=>e*.9),s=.13)}else{let e=.8+5.2*Math.sqrt(t()),n=(t()<.5?0:Math.PI)+Math.log(e)*2.3+V(t)*.3;a=[Math.cos(n)*e,V(t)*.1,Math.sin(n)*e],o=K.dimBlue.map(e=>e*.2),s=.045}e.pos.set(a,i*3),e.col.set(o,i*3),e.size[i]=s}return e.fx=[.32,0,0,0],e}inputBox(){let e=this.base(13),t=B(103),n=Math.floor(this.N*.32),r=4.4,i=.75,a=-.9,o=2*(r-i),s=Math.PI*i,c=2*o+2*s,l=e=>{let t=e*c;if(t<o)return[[-3.6500000000000004+t,-.15000000000000002],[0,1]];if(t-=o,t<s){let e=Math.PI/2-t/i;return[[r-i+Math.cos(e)*i,a+Math.sin(e)*i],[Math.cos(e),Math.sin(e)]]}if(t-=s,t<o)return[[r-i-t,a-i],[0,-1]];t-=o;let n=-Math.PI/2-t/i;return[[-3.6500000000000004+Math.cos(n)*i,a+Math.sin(n)*i],[Math.cos(n),Math.sin(n)]]};for(let o=0;o<n;o++){let n=t(),s,c;if(n<.5){let n=t(),[i,a]=l(n),u=V(t)*.022;s=[i[0]+a[0]*u,i[1]+a[1]*u,V(t)*.02],c=W(K.cyan,K.violet,(i[0]+r)/(2*r)).map(e=>e*.55),e.par[o]=Math.max(.001,n)}else if(n<.78){let[e,n]=l(t()),i=Math.abs(V(t))*.28;s=[e[0]+n[0]*i,e[1]+n[1]*i,V(t)*.08],c=W(K.cyan,K.violet,(e[0]+r)/(2*r)).map(e=>e*.12)}else if(n<.9)s=[(t()*2-1)*(r-.6),a+(t()*2-1)*(i-.2),-.05],c=K.dimBlue.map(e=>e*.05);else{let e=t()*z,n=.4+V(t)*.02;s=[r-.72+Math.cos(e)*n,a+Math.sin(e)*n,0],c=K.white.map(e=>e*.45)}e.pos.set(s,o*3),e.col.set(c,o*3),e.size[o]=.045}return e.gx=[.9,0,0,.35],e}chat(){let e=this.base(14),t=B(104),n=Math.floor(this.N*.5),r=Math.floor(n/3),i=this.chatPanels(),a=[U(`#bfe6ff`),U(`#ffd2ad`),U(`#d4c6ff`)],o=[.5,.72,1],s=[.95,.86,.98,.6,.93,.84,.72,.42],c=s.reduce((e,t)=>e+t,0);for(let n=0;n<3;n++){let l=i[n];for(let i=0;i<r;i++){let u=n*r+i,d=t(),f,p,m,h=0,ee=.042;if(d<.16){let[e]=Oe(t(),l.w/2,l.h/2,.28);f=e[0]+V(t)*.01,p=e[1]+V(t)*.01,m=K.dimBlue.map(e=>e*.2),h=t()*.05}else if(d<.19)f=(t()*2-1)*(l.w/2-.2),p=l.h/2-.68+V(t)*.008,m=K.dimBlue.map(e=>e*.14),h=t()*.05;else{let e=t()*c,r=0;for(;r<s.length-1&&e>s[r];)e-=s[r],r++;let i=(l.w-.6)*s[r],u=t();f=-l.w/2+.3+u*i,p=l.h/2-1.08-r*.4+V(t)*.026,m=a[n].map(e=>e*(.5+t()*.25)),h=(r+u)/s.length*o[n],ee=.045}let te=l.toWorld(f,p);e.pos.set(te,u*3),e.col.set(m,u*3),e.size[u]=ee,e.delay[u]=h}}for(let n=r*3;n<this.N;n++)e.delay[n]=t();return e.gx=[0,0,0,.35],e}chatPanels(){return[{x:-4.25,z:-.95,yaw:.28},{x:0,z:0,yaw:0},{x:4.25,z:-.95,yaw:-.28}].map(({x:e,z:t,yaw:n})=>({w:3.75,h:4.3,toWorld:(r,i)=>[e+Math.cos(n)*r,-.55+i,t-Math.sin(n)*r]}))}gridXY(e){let t=e%this.gw,n=Math.floor(e/this.gw);return[(t/(this.gw-1)-.5)*q.W,(.5-n/(this.gh-1))*q.H]}noise(){let e=this.base(15),t=B(105);for(let n=0;n<this.G;n++){let[r,i]=this.gridXY(n);e.pos.set([r+V(t)*.16,i+V(t)*.16,V(t)*1.3],n*3);let a=[t(),t(),t()].map(e=>H(e)*.45);e.col.set(a,n*3),e.size[n]=this.spacing*1.9}return e.gx=[0,0,0,0],e}image(e,t){let n=this.base(16);n.mid=n.col.slice();for(let r=0;r<this.G;r++){let[i,a]=this.gridXY(r);n.pos.set([i,a,0],r*3);let o=r*4;n.col.set([e[o],e[o+1],e[o+2]].map(e=>H(e/255)*.72),r*3),n.mid.set([t[o],t[o+1],t[o+2]].map(e=>H(e/255)*.72),r*3),n.size[r]=this.spacing*1.8}return n.gx=[0,0,0,0],n}video(e){let t=this.base(17),n=B(107);for(let n=0;n<this.G;n++){let[r,i]=this.gridXY(n),a=n*4,o=[e[a],e[a+1],e[a+2]].map(e=>e/255),s=(o[0]*.3+o[1]*.55+o[2]*.15-.3)*1.5+(.5-Math.abs(r)/q.W)*.6;t.pos.set([r,i,s],n*3),t.col.set(o.map(e=>H(e)*.72),n*3),t.size[n]=this.spacing*1.8}let r=Math.floor(this.N*.07);for(let e=0;e<r;e++){let r=this.G+e;t.pos.set([(n()-.5)*q.W*1.05,0,.4+n()*2.4],r*3),t.col.set(K.ice.map(e=>e*(.35+n()*.35)),r*3),t.size[r]=.1,t.par[r]=1}return t.fx=[0,0,0,1],t.gx=[0,0,.55,0],t}wave(){let e=this.base(18),t=B(108),n=Math.floor(this.N*.5),r=[K.cyan,K.blue,K.violet,K.pink,K.orange];for(let i=0;i<n;i++){let n=(t()*2-1)*8.8,a=t()<.16,o=a?V(t)*.02:Math.sign(t()-.5)*t()**1.8;e.pos.set([n,o,V(t)*(a?.04:.28)],i*3);let s=G(r,(n+8.8)/17.6),c=a?.8:.22+t()*.3;e.col.set(s.map(e=>e*c),i*3),e.size[i]=a?.045:.05+t()*.03}return e.fx=[0,0,1,0],e}graphNodes(){let e=[];for(let t=0;t<7;t++)e.push([-3.9+t*1.3,1.15*Math.sin(t*1.15+.2),1.4*Math.cos(t*.95)]);return e}graph(){let e=this.base(19),t=B(109),n=Math.floor(this.N*.45),r=this.graphNodes(),i=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,3],[2,4],[4,6]];for(let a=0;a<n;a++){let n=t(),o,s,c=.045;if(n<.34){let e=r[Math.floor(t()*r.length)],n=t()*2-1,i=t()*z,a=Math.sqrt(1-n*n),l=.38*t()**.5;o=[e[0]+a*Math.cos(i)*l,e[1]+n*l,e[2]+a*Math.sin(i)*l],s=W(K.white,K.cyan,t()*.5).map(e=>e*(.45+t()*.3)),c=.05}else if(n<.44){let e=r[Math.floor(t()*r.length)],n=t()*z,i=.62+V(t)*.03;o=[e[0]+Math.cos(n)*i,e[1]+Math.sin(n)*i*.35,e[2]+Math.sin(n)*i],s=K.ice.map(e=>e*.25)}else{let n=Math.floor(t()*i.length),[c,l]=i[n],u=r[c],d=r[l],f=n>=6?-1.1:.55,p=[(u[0]+d[0])/2,(u[1]+d[1])/2+f,(u[2]+d[2])/2+.3],m=t(),h=1-m;o=[0,1,2].map(e=>h*h*u[e]+2*h*m*p[e]+m*m*d[e]+V(t)*.022),s=W(K.blue,K.violet,m).map(e=>e*.28),e.par[a]=Math.max(.001,m)}e.pos.set(o,a*3),e.col.set(s,a*3),e.size[a]=c}return e.fx=[0,.02,0,0],e.gx=[1,0,0,.35],e}tunnel(){let e=this.base(20),t=B(110),n=Math.floor(this.N*.8);for(let r=0;r<n;r++){let n=t()*z,i=7.4+V(t)*.9,a=-76+t()*94;e.pos.set([Math.cos(n)*i,Math.sin(n)*i*.78,a],r*3);let o=t()<.07,s=W(K.ice,K.violet,t()*.7).map(e=>e*(o?.85:.2+t()*.22));e.col.set(s,r*3),e.size[r]=o?.12:.075}return e.fx=[0,.03,0,0],e}brand(e,t){let n=this.base(21),r=B(111),i=Math.floor(this.N*.42),a=Math.floor(this.N*.08),o=t;for(let e=0;e<i;e++){let t=o[Math.floor(r()*o.length)];n.pos.set([t[0]+V(r)*.008,t[1]+V(r)*.008,-62+V(r)*.06],e*3);let i=(t[0]+6.5)/13,a=W(K.white,K.ice,i*.8).map(e=>e*(.3+r()*.18)),s=.052;r()<.03&&(a=K.white.map(e=>e*.95),s=.12),n.col.set(a,e*3),n.size[e]=s}for(let e=0;e<a;e++){let t=i+e;n.pos.set([V(r)*5.2,.3+V(r)*1.7,-64.5+V(r)*1.2],t*3),n.col.set(W(K.cyan,K.violet,r()).map(e=>e*.07),t*3),n.size[t]=.07}return n.fx=[0,.015,0,0],n.gx=[0,0,0,.5],n.text=e,n}};function Oe(e,t,n,r){let i=2*(t-r),a=2*(n-r),o=Math.PI/2*r,s=e*(2*i+2*a+4*o),c=[[i,e=>[-t+r+e,n]],[o,e=>ke(t-r,n-r,Math.PI/2-e/r,r)],[a,e=>[t,n-r-e]],[o,e=>ke(t-r,-n+r,-e/r,r)],[i,e=>[t-r-e,-n]],[o,e=>ke(-t+r,-n+r,-Math.PI/2-e/r,r)],[a,e=>[-t,-n+r+e]],[o,e=>ke(-t+r,n-r,Math.PI-e/r,r)]];for(let[e,t]of c){if(s<=e)return[t(s)];s-=e}return[[-t+r,n]]}function ke(e,t,n,r){return[e+Math.cos(n)*r,t+Math.sin(n)*r]}function Ae(e,t,n){let r=1600,i=document.createElement(`canvas`);i.width=r,i.height=420;let a=i.getContext(`2d`),o=`"PingFang SC","HarmonyOS Sans SC","Microsoft YaHei","Noto Sans SC","Hiragino Sans GB",system-ui,sans-serif`,s=300;a.font=`800 ${s}px ${o}`;let c=a.measureText(e).width;c>r*.94&&(s=Math.floor(s*r*.94/c)),a.font=`800 ${s}px ${o}`,a.fillStyle=`#fff`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillText(e,r/2,420/2+s*.04);let l=a.getImageData(0,0,r,420).data,u=r,d=0,f=[];for(let e=0;e<420;e+=2)for(let t=0;t<r;t+=2)l[(e*r+t)*4+3]>140&&(f.push([t,e]),t<u&&(u=t),t>d&&(d=t));let p=Math.max(1,d-u),m=Math.min(t/p,t*.3/Math.max(1,s*.9)),h=(u+d)/2;return f.map(([e,t])=>[(e-h)*m,n-(t-420/2)*m])}function je(e,t,n,r=16,i=9){let a=document.createElement(`canvas`);a.width=t,a.height=n;let o=a.getContext(`2d`,{willReadFrequently:!0});o.drawImage(e,0,0,t,n);let s=o.getImageData(0,0,t,n).data.slice(),c=document.createElement(`canvas`);return c.width=r,c.height=i,c.getContext(`2d`).drawImage(e,0,0,r,i),o.clearRect(0,0,t,n),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality=`high`,o.drawImage(c,0,0,t,n),{sharp:s,blurred:o.getImageData(0,0,t,n).data.slice()}}var Me=16,J=.45,Y=28,Ne=[.5,.72,1];function Pe(e){let t=t=>e.querySelector(t),n=t=>[...e.querySelectorAll(t)];return{chips:n(`[data-chip]`),rail:n(`[data-rail]`).map(e=>({k:Number(e.dataset.rail),el:e})),chapters:n(`[data-chapter]`),hudInput:t(`[data-hud="input"]`),typed:t(`[data-typed]`),hudChat:t(`[data-hud="chat"]`),chatHeads:n(`[data-chat-head]`),chatStatus:n(`[data-chat-status]`),hudImage:t(`[data-hud="image"]`),step:t(`[data-step]`),stepBar:t(`[data-step-bar]`),hudVideo:t(`[data-hud="video"]`),timecode:t(`[data-timecode]`),scrub:t(`[data-scrub]`),hudGraph:t(`[data-hud="graph"]`),graphLabels:n(`[data-graph-label]`),progress:t(`[data-progress]`),cue:t(`[data-cue]`),skip:t(`[data-skip]`),veil:t(`[data-veil]`),space:t(`[data-space]`)}}function Fe(e,t){let n=t.toFixed(3);e.style.opacity!==n&&(e.style.opacity=n)}function X(e){e.style.opacity!==`0`&&(e.style.opacity=`0`)}function Z(){let e=B(55),t=b.length;return b.map((n,r)=>{let i=1-r/(t-1)*2,a=Math.sqrt(1-i*i),o=r*2.399963+.4,s=4.3+e()*1,c=[Math.cos(o)*a*s,i*s*.62,Math.sin(o)*a*s],l=[2.4,3.3,4.3,5.3][r%4],u=r/t*Math.PI*2*3+r%4*.7;return{hero:c,disk:[Math.cos(u)*l,.05,Math.sin(u)*l],box:[(e()*2-1)*3.2,-.9,0],delay:e()}})}function Ie(e,t,n){let r=n*t*(1.4/(.5+Math.hypot(e[0],e[2])*.45)),i=Math.cos(r),a=Math.sin(r);return[i*e[0]+a*e[2],e[1],-a*e[0]+i*e[2]]}var Le=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n];function Re({dom:e,timeline:t,copy:n,panels:r,nodes:i}){let a=e.chapters.map(e=>{let n=Number(e.dataset.first),r=Number(e.dataset.last),i={};return e.dataset.endInDwell&&(i.endInDwell=Number(e.dataset.endInDwell)),{el:e,win:t.chapterWindow(n,r,i),last:{o:-1,y:0}}}),o=Z(),s=e=>[[-q.W/2,q.H/2,e],[q.W/2,q.H/2,e],[-q.W/2,-q.H/2,e],[q.W/2,-q.H/2,e]];function c(e){for(let t of a){let{start:n,end:r}=t.win,i=Number.isFinite(n)?M(n,n+Me,e):1,a=Number.isFinite(r)?M(r-Me,r,e):0,o=i*(1-a),s=Math.min(Math.max(e-(Number.isFinite(n)?n:0),0)*J,Y),c=(1-i)*46-a*46-s;Math.abs(o-t.last.o)<.002&&Math.abs(c-t.last.y)<.2||(t.last={o,y:c},t.el.style.opacity=o.toFixed(3),t.el.style.transform=`translate3d(0, ${c.toFixed(1)}px, 0)`,t.el.classList.toggle(`is-live`,o>.02))}}function l({tau:n,S:r,pres:i}){e.progress.style.transform=`scaleX(${(n/t.total).toFixed(4)})`,e.cue.style.opacity=n<12?`1`:`0`;let a=n>t.total-60;e.skip.style.opacity=a?`0`:`1`,e.skip.style.pointerEvents=a?`none`:`auto`,e.veil.style.opacity=(1-i(9)*.8).toFixed(2);let o=r.travelK>=0?r.u<.5?r.a:r.b:r.dwellK,s=o===4?5:o;for(let t of e.rail)t.el.classList.toggle(`is-on`,t.k===s)}function u(e,t,n){let r=Ie(e.hero,.06,n),i=Ie(e.disk,.32,n);if(t.travelK===0)return{p:Le(r,i,N(Math.min(1,Math.max(0,t.u*1.5-e.delay*.5)))),o:1,sc:1};if(t.dwellK===1)return{p:i,o:1,sc:1};if(t.travelK===1){let n=N(Math.min(1,Math.max(0,t.u*1.6-e.delay*.6)));return{p:Le(i,e.box,n),o:1-n,sc:1-n*.6}}return t.dwellK>1||t.travelK>1?{p:r,o:0,sc:1}:{p:r,o:1,sc:1}}function d({S:t,time:n,pres:r,project:i,mobile:a}){let s=Math.max(r(0),r(1),+(t.travelK===0||t.travelK===1));e.chips.forEach((e,r)=>{if(s<.01){X(e);return}let c=u(o[r],t,n),l=i.depthOf(c.p),d=i.toScreen(c.p),f=t.dwellK===0||t.travelK===0&&t.u<.3?M(-2.8,-.4,c.p[2]):1,p=a?1:M(i.width*.42,i.width*.5,d.x),m=c.o*f*p*s*+!d.behind,h=c.sc*Math.min(1.25,Math.max(.62,15.5/Math.max(l,1)));e.style.opacity=m.toFixed(3),e.style.transform=`translate3d(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${h.toFixed(3)})`,e.style.zIndex=String(Math.round(1e3-l*10))})}function f(e,t,n,r){let i=t.map(r.toScreen),a=i.map(e=>e.x),o=i.map(e=>e.y),s=Math.min(...a),c=Math.min(...o);e.style.opacity=n.toFixed(3),e.style.width=`${Math.max(...a)-s}px`,e.style.height=`${Math.max(...o)-c}px`,e.style.transform=`translate3d(${s}px, ${c}px, 0)`}function p({S:r,tau:i,pres:a,project:o}){let s=a(2);if(s<.01){X(e.hudInput);return}f(e.hudInput,[[-4.4,-.15,0],[4.4,-.15,0],[-4.4,-1.65,0],[4.4,-1.65,0]],s,o);let c=t.travelOf(1),l=t.dwellOf(2),u=M(c.start+(c.end-c.start)*.7,l.end-6,i),d=Math.round(u*n.typed.length);e.typed.dataset.n!==String(d)&&(e.typed.dataset.n=String(d),e.typed.textContent=n.typed.slice(0,d))}function m({S:t,pres:i,project:a}){let o=i(3);if(o<.01){X(e.hudChat);return}Fe(e.hudChat,o);let s=ve[2],c=t.travelK===2?t.u:+(t.travelK>2||t.dwellK>=3);e.chatHeads.forEach((t,i)=>{let o=r[i],l=a.toScreen(o.toWorld(-o.w/2+.28,o.h/2-.34));t.style.transform=`translate3d(${l.x.toFixed(1)}px, ${l.y.toFixed(1)}px, 0) translateY(-50%)`;let u=c>=(1+Ne[i]*s.stagger)/(1+s.stagger)-.001;t.classList.toggle(`is-done`,u);let d=u?`${n.done} · ${x[i]}`:n.generating,f=e.chatStatus[i];f.textContent!==d&&(f.textContent=d)})}function h({S:t,pres:n,project:r}){let i=Math.max(n(4),n(5),+(t.travelK===4));if(i<.01){X(e.hudImage);return}f(e.hudImage,s(0),i,r);let a=t.travelK===4?t.u:+(t.dwellK>=5||t.travelK>=5),o=String(Math.max(1,Math.round(1+a*29))).padStart(2,`0`);e.step.textContent!==o&&(e.step.textContent=o),e.stepBar.style.transform=`scaleX(${a.toFixed(3)})`}function ee({time:t,pres:n,project:r}){let i=n(6);if(i<.01){X(e.hudVideo);return}f(e.hudVideo,s(.3),i,r);let a=t%5,o=Math.floor(a%1*24);e.timecode.textContent=`00:00:0${Math.floor(a)}:${String(o).padStart(2,`0`)}`,e.scrub.style.transform=`scaleX(${(a/5).toFixed(3)})`}function te({pres:t,project:n}){let r=t(8);if(r<.01){X(e.hudGraph);return}Fe(e.hudGraph,r),e.graphLabels.forEach((e,t)=>{let r=i[t],a=n.toScreen([r[0],r[1]-.78,r[2]]);e.style.transform=`translate3d(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) translate(-50%, 0)`})}function g(e){c(e.tau),l(e),d(e),p(e),m(e),h(e),ee(e),te(e)}return{update:g}}var ze=`
uniform float uTime;
uniform float uMorph;
uniform float uStagger;
uniform float uSwirl;
uniform float uHasMid;
uniform float uProj;
uniform float uFade;
uniform float uAspect;
uniform vec2 uMouse;
uniform float uMouseForce;
uniform vec4 uFxA;   // spin, flow, wave, rain
uniform vec4 uFxB;
uniform vec4 uGxA;   // pulse, breathe, shimmer, twinkle
uniform vec4 uGxB;

attribute vec3 aPosA;
attribute vec3 aPosB;
attribute vec3 aColA;
attribute vec3 aColB;
attribute vec3 aMidB;
attribute float aSizeA;
attribute float aSizeB;
attribute float aParA;
attribute float aParB;
attribute float aDelayB;
attribute vec4 aRnd;

varying vec3 vColor;
varying float vAlpha;
varying float vStreak;

const float TAU = 6.28318530718;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec3 animate(vec3 p, vec4 fx, vec4 gx, float par, inout vec3 col, inout float streak) {
  float t = uTime;
  if (gx.y > 0.0 && par > 0.5) {
    // 呼吸：球面沿法线起伏，像一团活的"潜空间"
    float n = sin(p.x * 1.15 + t * 0.9) * sin(p.y * 1.3 - t * 0.7) * sin(p.z * 1.2 + t * 0.55);
    p += normalize(p + 1e-4) * n * gx.y;
  }
  if (fx.x > 0.0) {
    // 差速旋转：越靠内转得越快（开普勒式）
    float r = length(p.xz);
    float a = t * fx.x * (1.4 / (0.5 + r * 0.45));
    p.xz = rot(a) * p.xz;
  }
  if (fx.y > 0.0) {
    p += fx.y * vec3(
      sin(t * 0.31 + p.y * 0.8 + aRnd.x * TAU),
      sin(t * 0.27 + p.z * 0.7 + aRnd.y * TAU),
      sin(t * 0.23 + p.x * 0.6 + aRnd.z * TAU));
  }
  if (fx.z > 0.0) {
    // 声波：振幅包络随时间跳动
    float x = p.x;
    float env = exp(-x * x / 40.0);
    float amp = 0.16 + env * (0.45 + 1.05 * abs(sin(x * 0.62 + t * 1.9)) * (0.55 + 0.45 * sin(x * 1.9 - t * 3.3)));
    float beat = 0.86 + 0.28 * pow(abs(sin(t * 2.1)), 8.0);
    p.y = p.y * amp * beat + sin(x * 0.45 - t * 1.3) * 0.5 * env;
  }
  if (fx.w > 0.0 && par > 0.5) {
    // 雨滴：在画面范围内循环下落
    float H = 7.2;
    p.y = 3.4 - mod(t * (5.0 + aRnd.x * 3.0) + aRnd.y * H, H);
    streak = 1.0;
  }
  if (gx.z > 0.0 && par < 0.5) {
    col *= 1.0 + gx.z * 0.45 * sin(t * 2.6 + p.x * 1.7 + p.y * 0.8);
  }
  if (gx.x > 0.0 && par > 0.0) {
    float pulse = pow(max(0.0, sin(par * 18.0 - t * 3.6)), 12.0);
    col += vec3(0.25, 0.8, 1.0) * pulse * gx.x * 1.4;
  }
  if (gx.w > 0.0) {
    col *= 1.0 + gx.w * pow(max(0.0, sin(t * (1.2 + aRnd.z * 2.0) + aRnd.x * TAU)), 16.0) * 2.5;
  }
  return p;
}

void main() {
  vec3 cA = aColA;
  vec3 cB = aColB;
  float sA = 0.0;
  float sB = 0.0;
  vec3 pA = animate(aPosA, uFxA, uGxA, aParA, cA, sA);
  vec3 pB = animate(aPosB, uFxB, uGxB, aParB, cB, sB);

  float m = clamp(uMorph * (1.0 + uStagger) - aDelayB * uStagger, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 p = mix(pA, pB, m);

  // 过渡中段的涡旋：让粒子"流"过去，而不是直线飞过去
  float arc = sin(3.14159265 * m);
  vec3 sw = vec3(
    sin(p.y * 0.42 + aRnd.x * TAU + uTime * 0.6),
    sin(p.z * 0.42 + aRnd.y * TAU + uTime * 0.5),
    sin(p.x * 0.42 + aRnd.z * TAU + uTime * 0.4));
  p += sw * arc * uSwirl * (0.5 + aRnd.w * 1.2);
  p.xz = rot(arc * uSwirl * 0.6 * (aRnd.x - 0.5)) * p.xz;

  vec3 midC = uHasMid > 0.5 ? aMidB : cB;
  vec3 col = m < 0.5 ? mix(cA, midC, m * 2.0) : mix(midC, cB, m * 2.0 - 1.0);
  float size = mix(aSizeA, aSizeB, m);
  float streak = mix(sA, sB, m);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;
  vec2 ndc = clip.xy / max(clip.w, 1e-3);
  vec2 dd = (ndc - uMouse) * vec2(uAspect, 1.0);
  float push = uMouseForce * exp(-dot(dd, dd) * 18.0);
  mv.xy += normalize(dd + vec2(1e-5)) * push * 0.9 * (0.6 + aRnd.w);
  col *= 1.0 + push * 1.6;

  gl_Position = projectionMatrix * mv;
  float depth = max(-mv.z, 0.01);
  float ps = size * uProj / depth;
  float alpha = uFade * smoothstep(0.8, 3.5, depth);
  alpha *= clamp(ps, 0.0, 1.0);
  // 近处的大点会让重叠绘制暴涨；封顶后靠光晕补回体积感
  gl_PointSize = clamp(ps, 1.0, 32.0);
  vColor = col;
  vAlpha = alpha;
  vStreak = streak;
}
`,Be=`
uniform float uGain;
varying vec3 vColor;
varying float vAlpha;
varying float vStreak;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  c.x *= mix(1.0, 5.0, vStreak);
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);
  float a = soft * soft * 0.85 + smoothstep(0.14, 0.0, d) * 0.55;
  gl_FragColor = vec4(vColor * a * vAlpha * uGain, 1.0);
}
`,Ve={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:null}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uRes;
    varying vec2 vUv;
    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }
    vec3 toSrgb(vec3 c) {
      c = max(c, 0.0);
      return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
    }
    void main() {
      vec2 cc = vUv - 0.5;
      float r2 = dot(cc, cc);
      vec2 off = cc * r2 * 0.012;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      col = toSrgb(col);
      col *= 1.0 - smoothstep(0.18, 0.62, r2) * 0.5;
      float g = hash12(floor(vUv * uRes) + floor(fract(uTime * 3.0) * 97.0));
      col += (g - 0.5) * 0.028;
      col += vec3(3.0, 5.0, 10.0) / 255.0;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `},He=1.6,Ue=160,We=9;function Ge(e,t=`auto`){return new Promise((n,r)=>{let i=new Image;i.decoding=`async`,i.fetchPriority=t,i.onload=()=>n(i),i.onerror=()=>r(Error(`landing image failed: ${e}`)),i.src=e})}function Ke(e){let t=window.matchMedia?.(`(pointer: coarse)`).matches,n=e.clientWidth||window.innerWidth,r=e.clientHeight||window.innerHeight,i=t||Math.min(n,r)<700;return{low:i,particles:i?22e3:64e3,grid:i?[150,84]:[224,126],bloom:!i,gain:i?.62:.5,pixelRatio(e,t){let n=i?16e5:3e6,r=Math.min(window.devicePixelRatio||1,i?1.25:1.5,Math.sqrt(n/Math.max(1,e*t)));return Math.max(1,r)}}}function qe({root:t,stage:a,canvas:l,brandName:m,imageUrl:g,locale:ie}){let v=Ke(t),b=Pe(t),x=P(),S=se(ie),C=()=>a.clientWidth/Math.max(1,a.clientHeight)<.9,de=()=>C()?8.6:10.2,w=e=>j(e,a.clientHeight),fe=()=>_e(t.scrollTop,a.clientHeight),T=!1,E=null,D=null,O=null,k=null,A=0,ye=0,xe=null,F=m,I=null,L=[];function Se(e,t,n,r){e.addEventListener(t,n,r),L.push(()=>e.removeEventListener(t,n,r))}function Ce(){b.space.style.height=`${w(x.total)+a.clientHeight}px`}Ce();function we(e){t.scrollTo({top:w(x.anchor(e)),behavior:`auto`})}function Te(){t.scrollTo({top:w(x.total),behavior:`auto`})}let R={timeline:x,goTo:we,goToEnd:Te,setBrandName(e){let t=String(e||``).trim().slice(0,12)||F;t!==F&&(F=t,I=t)},destroy(){T=!0,cancelAnimationFrame(A),clearTimeout(ye),xe?.disconnect();for(let e of L)e();D?.dispose?.(),O?.dispose?.(),E?.dispose(),E?.forceContextLoss?.()}};return z().catch(e=>{console.error(`[landing] particle scene unavailable`,e),t.dataset.sceneFallback=`1`}),R;async function z(){E=new re({canvas:l,antialias:!1,powerPreference:`high-performance`,alpha:!1}),E.setClearColor(0,1);let d=new r,m=new ne(38,1,.1,400),ie=new Map([le,ce].map(e=>[e,Ge(g(e))])),oe=Promise.all(ie.values()),se=v.particles,[w,_e]=v.grid,j=new De(se,w,_e),P=[j.orb(),j.disk(),j.inputBox(),j.chat(),j.noise(),j.noise(),j.noise(),j.wave(),j.graph(),j.tunnel(),j.brand(F,Ae(F,de(),1.15))];P.forEach((e,t)=>{e.id=String(t)}),I=null;let we=e=>{if(!e.attr){let t=new _(e.col,3);e.attr={pos:new _(e.pos,3),col:t,mid:e.mid?new _(e.mid,3):t,size:new _(e.size,1),par:new _(e.par,1),delay:new _(e.delay,1)}}return e.attr},R=new i,z=B(3),H=new Float32Array(se*4);for(let e=0;e<H.length;e++)H[e]=z();R.setAttribute(`aRnd`,new _(H,4));let U={uTime:{value:0},uMorph:{value:0},uStagger:{value:1},uSwirl:{value:0},uHasMid:{value:0},uProj:{value:1e3},uFade:{value:0},uAspect:{value:1},uMouse:{value:new y(9,9)},uMouseForce:{value:0},uGain:{value:v.gain},uFxA:{value:new f},uFxB:{value:new f},uGxA:{value:new f},uGxB:{value:new f}},W=new h(R,new s({uniforms:U,vertexShader:ze,fragmentShader:Be,transparent:!0,depthWrite:!1,depthTest:!1,blending:5,blendEquation:100,blendSrc:201,blendDst:201}));W.frustumCulled=!1,W.renderOrder=2,d.add(W);let G=``;function K(e,t){let n=`${e.id}>${t.id}`;if(n===G)return;G=n;let r=we(e),i=we(t);R.setAttribute(`position`,r.pos),R.setAttribute(`aPosA`,r.pos),R.setAttribute(`aPosB`,i.pos),R.setAttribute(`aColA`,r.col),R.setAttribute(`aColB`,i.col),R.setAttribute(`aMidB`,i.mid),R.setAttribute(`aSizeA`,r.size),R.setAttribute(`aSizeB`,i.size),R.setAttribute(`aParA`,r.par),R.setAttribute(`aParB`,i.par),R.setAttribute(`aDelayB`,i.delay),U.uFxA.value.fromArray(e.fx),U.uFxB.value.fromArray(t.fx),U.uGxA.value.fromArray(e.gx),U.uGxB.value.fromArray(t.gx),U.uHasMid.value=+!!t.mid}let q=new u;q.visible=!1,d.add(q);let Oe=ue.map((e,t)=>{let n=new p({color:13619151,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),r=new te(new ee(4.2,2.36),n),i=4-t*4.6,a=t*2.25+.7;r.position.set(Math.cos(a)*4.9,Math.sin(a)*2.9,i),r.lookAt(r.position.x*.3,r.position.y*.3,i+12),r.renderOrder=1;let s=new o(new ae(r.geometry),new c({color:12577279,transparent:!0,opacity:0,depthWrite:!1}));return r.add(s),q.add(r),{name:e,mesh:r,edge:s,z:i,ready:!1}});oe.then(([e,t])=>{if(T)return;let n=je(e,w,_e);P[5]=Object.assign(j.image(n.sharp,n.blurred),{id:`5`}),P[6]=Object.assign(j.video(je(t,w,_e).sharp),{id:`6`}),G=``},e=>console.warn(`[landing] showcase sampling skipped`,e)).finally(()=>{if(!T)for(let e of Oe)(ie.get(e.name)||Ge(g(e.name),`low`)).then(t=>{T||V(e,t)},()=>{})}),D=new me(E),D.addPass(new he(d,m)),v.bloom&&(O=new ge(new y(a.clientWidth,a.clientHeight),.55,.4,.22),D.addPass(O)),k=new pe(Ve),k.uniforms.uRes.value=new y(1,1),D.addPass(k);let ke=Re({dom:b,timeline:x,copy:S,panels:j.chatPanels(),nodes:j.graphNodes()});function Me(){let e=Math.max(1,a.clientWidth),t=Math.max(1,a.clientHeight),n=v.pixelRatio(e,t);E.setPixelRatio(n),E.setSize(e,t,!1),D.setPixelRatio(n),D.setSize(e,t),O?.setSize(e,t),k.uniforms.uRes.value.set(e*n,t*n),m.aspect=e/t,Ce()}Me(),xe=new ResizeObserver(()=>{clearTimeout(ye),ye=setTimeout(Me,Ue)}),xe.observe(a);let J={x:9,y:9,sx:0,sy:0,active:0,lastAt:-10};window.matchMedia?.(`(pointer: fine)`).matches&&(Se(t,`pointermove`,e=>{let t=a.getBoundingClientRect();J.x=(e.clientX-t.left)/t.width*2-1,J.y=-((e.clientY-t.top)/t.height)*2+1,J.lastAt=performance.now()},{passive:!0}),Se(t,`pointerleave`,()=>{J.lastAt=-10}));let Y=new n,Ne=new y,Pe=new n,Fe=new n,X=new n,Z=new n,Ie=e=>C()?[0,.14]:e===`right`?[.19,0]:[0,0],Le=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n];function Ke(e,t){if(e.travelK<0){let n=be(e.dwellK,e.dwellP,t);return{...n,shift:Ie(n.layout),flight:n.fov>45}}let n=be(e.a,1,t),r=be(e.b,0,t),i=N(e.u),a=Ie(n.layout),o=Ie(r.layout),s=n.fov+(r.fov-n.fov)*i;return{pos:Le(n.pos,r.pos,i),target:Le(n.target,r.target,i),fov:s,roll:n.roll+(r.roll-n.roll)*i,zoom:n.zoom+(r.zoom-n.zoom)*i,shift:[a[0]+(o[0]-a[0])*i,a[1]+(o[1]-a[1])*i],flight:s>45}}function qe(t,n){let r=Ke(t,n),i=m.aspect;if(X.set(...r.pos),Z.set(...r.target),!r.flight&&i<1.2){let e=Math.max(1,1.12/i)*(i<.9?r.zoom:1);X.sub(Z).multiplyScalar(e).add(Z)}m.fov=r.fov,m.position.copy(X),m.up.set(0,1,0),m.lookAt(Z),m.updateMatrixWorld();let a=2*X.distanceTo(Z)*Math.tan(e.degToRad(r.fov)/2);Pe.set(1,0,0).applyQuaternion(m.quaternion),Fe.set(0,1,0).applyQuaternion(m.quaternion);let o=-r.shift[0]*a*i,s=-r.shift[1]*a,c=J.lastAt>0;J.sx+=((c?J.x:0)-J.sx)*.04,J.sy+=((c?J.y:0)-J.sy)*.04;let l=r.flight?.9:.55;m.position.add(Y.copy(Pe).multiplyScalar(o+J.sx*l)),m.position.add(Y.copy(Fe).multiplyScalar(s+J.sy*l*.6)),Z.add(Pe.multiplyScalar(o)).add(Fe.multiplyScalar(s)),m.lookAt(Z),r.roll&&m.rotateZ(r.roll),m.updateProjectionMatrix(),m.updateMatrixWorld()}let Je={width:1,height:1,toScreen(e){return Y.set(e[0],e[1],e[2]).project(m),{x:(Y.x+1)*.5*Je.width,y:(1-Y.y)*.5*Je.height,behind:Y.z>1}},depthOf(e){return-Y.set(e[0],e[1],e[2]).applyMatrix4(m.matrixWorldInverse).z}},Q=null;function Ye(e,t){let n=P[10],r={id:`brand-prev-${t}`,pos:n.pos.slice(),col:n.col.slice(),size:n.size.slice(),par:n.par.slice(),delay:n.delay.slice(),mid:null,fx:n.fx,gx:n.gx},i=j.brand(e,Ae(e,de(),1.15)),a=we(n);a.pos.array.set(i.pos),a.col.array.set(i.col),a.size.array.set(i.size),a.pos.needsUpdate=!0,a.col.needsUpdate=!0,a.size.needsUpdate=!0,Q={prev:r,start:t},G=``}let Xe=performance.now(),Ze=Xe,Qe=0,$=fe(),$e=0,et=0,tt=!1,nt=Ee({root:t,listen:Se,heroEnd:x.dwellOf(0).end});b.skip.addEventListener(`click`,Te),L.push(()=>b.skip.removeEventListener(`click`,Te));function rt(){A=requestAnimationFrame(rt);let n=performance.now(),r=Math.min(Math.max((n-Ze)/1e3,0),.05)||.016;Ze=n,Qe+=r;let i=Qe;U.uTime.value=i,U.uFade.value=Math.min(1,(n-Xe)/1600);let o=fe();$+=(o-$)*(1-Math.exp(-r*We)),(!Number.isFinite($)||Math.abs(o-$)<.01)&&($=o);let s=x.at(nt.sceneTau($,Qe,r)),c=e=>x.presence($,e);if(I&&!Q&&(Ye(I,i),I=null),Q&&s.dwellK===10){let e=Math.min(1,(i-Q.start)/He);K(Q.prev,P[10]),U.uMorph.value=e,U.uStagger.value=1.2,U.uSwirl.value=.55,e>=1&&(Q=null,G=``)}else{Q&&s.b!==10&&(Q=null),K(P[s.a],P[s.b]);let e=ve[s.a];U.uMorph.value=s.morph,U.uStagger.value=e.stagger,U.uSwirl.value=e.swirl}qe(s,i),Je.width=a.clientWidth,Je.height=a.clientHeight,U.uProj.value=E.getDrawingBufferSize(Ne).y/(2*Math.tan(e.degToRad(m.fov)/2)),U.uAspect.value=m.aspect;let l=+(J.lastAt>0&&n-J.lastAt<1800);J.active+=(l-J.active)*.06,U.uMouseForce.value=J.active*(.35+Math.max(c(0),c(10))*.65),U.uMouse.value.set(J.x,J.y);let u=c(9);if(q.visible=u>.01,q.visible)for(let e of Oe){let t=m.position.z-e.z,n=e.ready?u*M(34,18,t)*M(.5,4,t):0;e.mesh.material.opacity=n*.95,e.edge.material.opacity=n*.5}k.uniforms.uTime.value=i,D.render(r),ke.update({S:s,tau:$,time:i,pres:c,project:Je,mobile:C()}),$e++,$e===2&&(t.dataset.sceneReady=`1`),$e>90&&!tt&&(et=et*.97+(r>.026)*.03,et>.6&&(tt=!0,O?.enabled?O.enabled=!1:R.setDrawRange(0,Math.floor(se*.8))))}A=requestAnimationFrame(rt)}function V(e,t){let n=new oe(t);n.colorSpace=d,n.anisotropy=4,n.needsUpdate=!0,e.mesh.material.map=n,e.mesh.material.needsUpdate=!0,e.ready=!0}}export{qe as createParticleScene};