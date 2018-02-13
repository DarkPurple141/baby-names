<template lang="html">
   <social-sharing :url="url"
             title="Vote on my list!"
             description="BabyNamer allows you to call on the masses to help you decide a name or names for your future child."
             hashtags="baby-names,baby,social"
             inline-template>
      <div class="social-icons">
         <div class="list-icon">
            <network network="email">
             <div class="icon">
                <icon scale="'1.5'" name="envelope"/>
             </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="facebook">
              <div class="icon">
                 <icon scale="'1.5'" name="facebook"/>
              </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="linkedin">
              <div class="icon">
                 <icon scale="'1.5'" name="linkedin"/>
              </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="reddit">
              <div class="icon">
                 <icon scale="'1.5'" name="reddit"/>
              </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="twitter">
              <div class="icon">
                 <icon scale="'1.5'" name="twitter"/>
              </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="weibo">
              <div class="icon">
                 <icon scale="'1.5'" name="weibo"/>
              </div>
            </network>
         </div>
         <div class="list-icon">
            <network network="whatsapp">
              <div class="icon">
                 <icon scale="'1.5'" name="whatsapp"/>
              </div>
            </network>
         </div>
      </div>
   </social-sharing>
</template>

<script>
export default {
   props: {
      url: String
   }
}
</script>

<style lang="less">
@import '../assets/icons';

</style>
