<template>
<div>
<no-ssr>
    <form @formSend="sendForm = false" :sendForm="sendForm">
        <ejs-richtexteditor name="defaultRTE" :height="400"  :toolbarSettings="toolbarSettings" :actionBegin="handleFullScreen" :actionComplete="actionCompleteHandler" :showCharCount="showCharCount" :maxLength="maxLength" :placeholder="placeholder">
          
          <img v-bind:src="imageLink" style="width: 200px;">
        </ejs-richtexteditor>
         
    </form>
  
</no-ssr>
        <button v-on:click="validateSubmit()" class="samplebtn e-control e-btn" type="submit" data-ripple="true">Submit</button>

 <!-- <button v-on:click="callapi()">click</button> -->
</div>
</template>
<style>

@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
</style>
<script>
    import { Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table } from "@syncfusion/ej2-vue-richtexteditor";
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
    //  props: ['sendForm'],
    props: {
        sendForm: Object,
        srcImage: String
    },
     watch: {
       sendForm(value){
           if(value){
              //send form...
              //run emit so we can set the sendForm back to false
              this.$emit('formSend');
              
            }
        }
   },
    provide:{
        richtexteditor:[Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table]
    },
    data() {
        return {
            imageLink: '',
            showCharCount: true,
            myCodeMirror: '',
            maxLength: 2000,
            placeholder: 'type here...',
            toolbarSettings: {
                items: []
                // items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                // 'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                // 'LowerCase', 'UpperCase', '|',
                // 'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                // 'Outdent', 'Indent', '|',
                // 'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
            },
        }
    },
    mounted() {
    //    var defaultRTE = new ej.richtexteditor.RichTextEditor({ 
    //     showCharCount: true,
    //     maxLength: 100,
    //     placeholder: 'Type something'
    //   });
        // this.imageLink = localStorage.src
        this.imageLink = this.srcImage.file[0].path
    },
    methods: {
         validateSubmit(){debugger
            var config = { headers: {'token': localStorage.accessToken}};
               var form = document.forms[0];
               var formData = new FormData(form);
               var rteValue = formData.get('defaultRTE');
            AuthenticationService.postData_onlogin('discover/publish',{
              photo: rteValue
            }, config).then((response)=>{
                console.log('resp',response)
            }).catch((error)=>{
              console.log('error',error.response.data.message)
            })
        },
        mirrorConversion: function(e) {
            var textArea = this.$refs.rteObj.ej2Instances.contentModule.getEditPanel();
            var id = this.$refs.rteObj.getID() +  'mirror-view';
            var mirrorView = this.$refs.rteObj.$el.parentNode.querySelector('#' + id);
            var charCount = this.$refs.rteObj.$el.parentNode.querySelector('.e-rte-character-count');
            if (e.targetItem === 'Preview') {
                textArea.style.display = 'block';
                mirrorView.style.display = 'none';
                textArea.innerHTML = this.myCodeMirror.getValue();
                charCount.style.display = 'block';
            }
            else {
                if (!mirrorView) {
                    mirrorView = document.createElement('div', { className: 'e-content' });
                    mirrorView.id = id;
                    textArea.parentNode.appendChild(mirrorView);
                }
                else {
                    mirrorView.innerHTML = '';
                }
                textArea.style.display = 'none';
                mirrorView.style.display = 'block';
                this.renderCodeMirror(mirrorView, this.$refs.rteObj.ej2Instances.value);
                charCount.style.display = 'none';
            }
        },
        renderCodeMirror: function(mirrorView, content) {
        this.myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,

        });
    },
        handleFullScreen: function(e){
        var leftBar;
        var transformElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    },
        actionCompleteHandler: function(e) {
           if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
                this.$refs.rteObj.ej2Instances.sourceCodeModule.getPanel().style.display = 'none';
                this.mirrorConversion(e);
            }
            else {
                var proxy = this;
                setTimeout(function () { proxy.$refs.rteObj.ej2Instances.toolbarModule.refreshToolbarOverflow(); }, 400);
            }
        }
    }
};
</script>
